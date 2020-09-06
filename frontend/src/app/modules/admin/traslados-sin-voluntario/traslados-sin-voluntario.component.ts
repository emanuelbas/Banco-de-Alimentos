import { Component, OnInit } from '@angular/core';
import { Traslado } from '../../../_services/lbservice/models'
import { BeneficiarioApi, EnvioParaBeneficiarioApi ,DonacionApi, DonanteApi, DescripcionGeneralApi, TrasladoApi, UbicacionApi } from '../../../_services/lbservice/services'
import { Location } from '@angular/common';
import { VoluntariosService } from 'src/app/_services/voluntarios.service';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/_services/api-requests.service';
import { DataShareService } from 'src/app/_services/data-share.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-traslados-sin-voluntario',
  templateUrl: './traslados-sin-voluntario.component.html',
  styleUrls: ['./traslados-sin-voluntario.component.css']
})
export class TrasladosSinVoluntarioComponent implements OnInit {

	traslados = [];
	abortarTraslado : Traslado;
	trasladoAEditar : Traslado;
	fechaDeHoy:Date;
	form:FormGroup;
	public p:any;

	constructor(private data:DataShareService, private requester: ApiRequestsService, private router:Router,private service: VoluntariosService,private apiBeneficiario: BeneficiarioApi,private apiEnvio:EnvioParaBeneficiarioApi ,private apiDescGeneral: DescripcionGeneralApi, private apiUbicacion:UbicacionApi, private apiDonante:DonanteApi, private apiDonacion:DonacionApi,public _location: Location, private apiTraslado: TrasladoApi) {
		requester.getAllTrasladosSinVoluntario().then(arr => {
			this.traslados =arr;	
		})
	
		this.fechaDeHoy = new Date()

		    this.form = new FormGroup({
				descripcion: new FormControl('', [Validators.required]),
				peso: new FormControl('', [Validators.required]),
				volumenTotal: new FormControl('', [Validators.required]),
				fechaVencimientoProductos: new FormControl('', [Validators.required]),
        	});
	 } //Fin constructor

	buscarVoluntariosParaTraslado(traslado){
		let ruta = '/buscar-voluntarios/'+traslado[6].id+'/'+encodeURIComponent(traslado[0])+'/'+encodeURIComponent(traslado[1]);
		this.router.navigate([ruta]);
	}

	cancelarTraslado(traslado){
		this.abortarTraslado = traslado;
	}
	editarTraslado(traslado){

		this.trasladoAEditar = traslado;
		this.form.setValue({descripcion: traslado.descripcion});
		this.form.setValue({peso: traslado.peso});
		this.form.setValue({volumenTotal: traslado.volumenTotal});
		this.form.setValue({fechaVencimientoProductos: traslado.fechaVencimientoProductos}); 
		
	}
	onConfirmarCancelacionDeTraslado(){
		this.apiTraslado.patchAttributes(this.abortarTraslado.id,{estado:"abortado"}).subscribe(()=>{this.requester.getAllTrasladosSinVoluntario().then(arr => {this.traslados =arr;console.log(arr)})})
	}

	onGuardarCambiosTraslado(){
	
			
			this.trasladoAEditar.peso = this.form.get("peso").value;
			this.trasladoAEditar.descripcion = this.form.get("descripcion").value;
			this.trasladoAEditar.volumenTotal = this.form.get("volumenTotal").value;
			this.trasladoAEditar.fechaVencimientoProductos = new Date(this.form.get("fechaVencimientoProductos").value+'T00:00:00');
			this.apiTraslado.patchAttributes(this.trasladoAEditar.id,{
				descripcion:this.trasladoAEditar.descripcion,peso:this.trasladoAEditar.peso,fechaVencimientoProductos:this.trasladoAEditar.fechaVencimientoProductos,volumenTotal:this.trasladoAEditar.volumenTotal}).subscribe(()=>{this.requester.getAllTrasladosSinVoluntario().then(arr => {this.traslados =arr;console.log(arr)})})
				

	
	}

	get peso() {
		return this.form.get('peso')
	}

	get descripcion() {
		return this.form.get('descripcion')
	}

	get volumenTotal() {
		return this.form.get('volumenTotal')
	}

	get fechaVencimientoProductos() {
		return this.form.get('fechaVencimientoProductos')
	}


	ngOnInit() {
    this.data.cambiarTitulo("Traslados sin voluntario");

	}

}
