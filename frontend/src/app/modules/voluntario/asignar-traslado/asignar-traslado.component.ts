import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BALP } from '../../../_models/BALP';
import { VoluntarioApi, BeneficiarioApi, UbicacionApi, TrasladoApi, DonanteApi, DonacionApi, EnvioParaBeneficiarioApi } from '../../../_services/lbservice/services';
import { Voluntario, Beneficiario, Donante, Traslado, Ubicacion, Volumen, Donacion, EnvioParaBeneficiario } from '../../../_services/lbservice/models';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from 'src/app/_services/data-api.service';
import { DataShareService } from 'src/app/_services/data-share.service';


@Component({
  selector: 'app-asignar-traslado',
  templateUrl: './asignar-traslado.component.html',
  styleUrls: ['./asignar-traslado.component.css']
})
export class AsignarTrasladoComponent implements OnInit {

	idTraslado: string;
	form: FormGroup;
	traslado : Traslado;
	origen: string;
	destino:  string;
	voluntario: Voluntario;
	balp : BALP = new BALP;

	/*
		El usuario recibe un email como 
		localhost:4200/asignar-traslado/5de0d2485d310221a87098aa
	*/
 	constructor(private data:DataShareService, public dataApi:DataApiService, protected http: HttpClient, private apiBeneficiario:BeneficiarioApi, private apiEnvio:EnvioParaBeneficiarioApi, private apiDonante:DonanteApi ,private apiDonacion:DonacionApi,private apiVoluntario:VoluntarioApi, private apiTraslado:TrasladoApi, private apiUbicacion:UbicacionApi, private router: ActivatedRoute, private route:ActivatedRoute) {
 		//Obtengo el idTraslado por la URL
			this.idTraslado = route.snapshot.paramMap.get("idTraslado");
		  this.form = new FormGroup ({
			// atributos del traslado
			fecha : new FormControl(),
			origen : new FormControl(),
			destino : new FormControl(),
			puntaje : new FormControl(),
		  });

		// obtengo el voluntario que tiene iniciada la sesión
		this.voluntario = apiVoluntario.getCachedCurrent();

		// obtengo el traslado a partir del idDeTraslado recibido por parámetro
    this.dataApi.getTrasladoPorId(this.idTraslado).subscribe((trasladoRecuperado:Traslado)=>{
			this.traslado = trasladoRecuperado;		
			/*	Tenemos el traslado
				A partir de acá pueden pasar dos cosas
					1. El traslado es de una donacion, entonces el origen es un donante y el destino el banco
					2. El traslado es de un envio para beneficiario, entonces el origen es el banco y el destino es un beneficiario
			*/
			if (this.traslado.tipo == 'donacion'){
				//Caso 1 (donación)
				//1. Recuperar la donacion trasladada al banco
				this.dataApi.getDonacionPorId(this.traslado.idDonacionTrasladadaAlBanco).subscribe((donacion:Donacion)=>{
					//2. Recuperar el donante de esa donacion
					this.dataApi.getDonantePorId(donacion.idDonante).subscribe((donanteRecuperado:Donante)=>{ // obtuve al donante
						//3. Recuperar la ubicación de ese donante (busco la ubicación del donante con el id del donanteRecuperado)
					this.dataApi.getUbicacionPorIdDonante(donanteRecuperado.id).subscribe((ubicacionRecuperada:Ubicacion)=>{				
							//4. Guardar la direccion como origen
							//console.log('Ubicacion ', ubicacionRecuperada.direccion);					
							this.origen = ubicacionRecuperada.direccion
							this.destino = this.balp.ubicacionBALP.direccion;																			
					   })
					}) 
				}) //Fin donacion
			} else {
				//Caso 2 (envio)
				//1. Recuperar el envio trasladado a un beneficiario
				this.dataApi.getEnvioPorId(this.traslado.idEnvioTrasladadoAUnBeneficiario).subscribe((envio:EnvioParaBeneficiario)=>{					
					//2. Recuperar el beneficiario de ese envio
					this.dataApi.getBeneficarioPorId(envio.beneficiarioId).subscribe((beneficiarioRecuperado:Beneficiario)=>{
						//3. Recuperar la ubicacion de ese beneficiario						
					this.dataApi.getUbicacionPorIdBeneficiario(beneficiarioRecuperado.id).subscribe((ubicacionRecuperada:any)=>{	
																
							//4. Guardar la direccion como destino
							 this.destino = ubicacionRecuperada.direccion;						
							//5. Guardar la direccion del banco como origen
							this.origen = this.balp.ubicacionBALP.direccion;
					    	// console.log('origen2:', this.origen);					
						})
					})				
				}) // Fin envío																	
			} //Fin del if/else
 		}) // Fin de la primer promesa de todas
	 } 	// Fin del constructor
	
	// SE MUESTRAN EN LA VISTA LOS DATOS DEL TRASLADO (¡¡POR FIN!!)

			// DE ACA EN ADELANTE SE ASOCIA EL VOLUNTARIO AL TRASLADO
			onSubmit() {
			this.traslado.voluntarioId = this.voluntario.id;
			this.traslado.estado = "en traslado";
			this.traslado.fechaAsignacion = new Date;	
			//this.dataApi.asignarTraslado(this.traslado);
			console.log('id voluntario:', this.voluntario.id)
				 this.apiTraslado.upsert(this.traslado).subscribe(()=>
				 	console.log('id voluntario:', this.voluntario.id)
				 )
				
				alert('La asignación del traslado se registró correctamente');
					console.log('voluntario asignado al traslado:', this.traslado.voluntarioId);
					console.log('id de voluntario:', this.voluntario.id);
					console.log('datos del traslado:', this.traslado);
					//console.log('voluntario logueado:', this.voluntario.id);
			}
		
	ngOnInit() {
		this.data.cambiarTitulo("Asignar traslado");
	}	

}
