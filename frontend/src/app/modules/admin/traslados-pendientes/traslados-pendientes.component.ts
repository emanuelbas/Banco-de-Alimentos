import { Component, OnInit } from '@angular/core';
import { Beneficiario, EnvioParaBeneficiario, Donacion, Donante, DescripcionGeneral, Traslado, Voluntario, Ubicacion, DescripcionDetallada } from '../../../_services/lbservice/models'
import { BeneficiarioApi, EnvioParaBeneficiarioApi ,DonacionApi, DonanteApi, DescripcionGeneralApi, TrasladoApi, VoluntarioApi, UbicacionApi, DescripcionDetalladaApi } from '../../../_services/lbservice/services'
import {Location} from '@angular/common';
import { BALP } from '../../../_models/BALP';
import { FilaTrasladoPendiente } from './FilaTrasladoPendiente';
import { DataShareService } from 'src/app/_services/data-share.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-traslados-pendientes',
  templateUrl: './traslados-pendientes.component.html',
  styleUrls: ['./traslados-pendientes.component.css']
})
export class TrasladosPendientesComponent implements OnInit {

  form : FormGroup;
  filas : FilaTrasladoPendiente[] = [];
  dirBALP : Ubicacion = (new BALP).ubicacionBALP;
  filasOriginal;
  p:any;
  constructor(private data:DataShareService,private route: ActivatedRoute, private router:Router,private voluntarioApi: VoluntarioApi,private apiBeneficiario: BeneficiarioApi,private apiEnvio:EnvioParaBeneficiarioApi ,private apiDescGeneral: DescripcionGeneralApi, private apiUbicacion:UbicacionApi, private apiDonante:DonanteApi, private apiDonacion:DonacionApi,public _location: Location, private apiTraslado: TrasladoApi) { 


    this.form = new FormGroup ({
    	nombre : new FormControl()
    });

  	apiTraslado.find().subscribe((traslados:Traslado[])=>{
  		traslados = traslados.filter(traslado => traslado.estado == "en traslado");
      console.log(traslados);
      for (let traslado of traslados){
  			// Pido voluntario
        voluntarioApi.findById(traslado.voluntarioId).subscribe((voluntario:Voluntario)=>{
          // Bifurcada
          if (traslado.tipo=='donacion'){
            //Caso donacion
              //Pido donacion
              apiDonacion.findById(traslado.idDonacionTrasladadaAlBanco).subscribe((donacion:Donacion)=>{
                 apiDonante.findById(donacion.idDonante).subscribe((donante:Donante)=>{
                   apiDonante.getUbicacion(donante.id,true).subscribe((ubicacion:Ubicacion)=>{
                       //Bifurcada descripcion
                       if (donacion.tipoDescripcion=='general'){
                         //Caso general
                         apiDonacion.getDescripcionGeneral(donacion.id,true).subscribe((desc:DescripcionGeneral)=>{
                           this.filas.push(
                             new FilaTrasladoPendiente(traslado,voluntario,donacion,ubicacion,this.dirBALP)
                           ) //fin push
                         })
                       } else {
                         apiDonacion.getDescripcionDetallada(donacion.id,true).subscribe((desc:DescripcionDetallada)=>{
                           this.filas.push(
                             new FilaTrasladoPendiente(traslado,voluntario,donacion,ubicacion,this.dirBALP)
                           ) //fin push
                         })
                       } //fin if/else
                   }) //Fin ubicacion
                 }) //fin donante
              }) //Fin donacion  
          } else {
            //Caso envio
            //Pido envio
            apiEnvio.findById(traslado.idEnvioTrasladadoAUnBeneficiario).subscribe((envio:EnvioParaBeneficiario)=>{
              apiEnvio.getBeneficiario(traslado.idEnvioTrasladadoAUnBeneficiario,true).subscribe((beneficiario:Beneficiario)=>{
                apiBeneficiario.getUbicacion(beneficiario.id,true).subscribe((ubicacion:Ubicacion)=>{
                  this.filas.push(
                      new FilaTrasladoPendiente(traslado,voluntario,envio,this.dirBALP,ubicacion)
                    )
                }) //fin ubi
              }) //fin bene
            }) //fin envio
                //Pido beneficiario
                  //Pido ubicacion
                    //Guardo en array la fila
                      //traslado, voluntario, donacion, dorigen, ddestino, distancia, fecha     
          } //Fin bifurcada
        }) //Fin voluntario
  				
	  				


  		} //Fin for traslados


  	}) //Fin traslados
  }// Fin del constructor

  filtrar(){


  if (this.filasOriginal == null) {
    this.filasOriginal = this.filas;
  }
  this.filas = [];
  for (let fila of this.filasOriginal.filter((fila:FilaTrasladoPendiente) =>
   fila.printVoluntario() == this.form.get("nombre").value)){
    this.filas.push(fila);
  }

  }

  verTodos(){
    this.filas = this.filasOriginal;
  }

  ngOnInit() {
    this.data.cambiarTitulo("Envios Pendientes de traslado");
  }

}
