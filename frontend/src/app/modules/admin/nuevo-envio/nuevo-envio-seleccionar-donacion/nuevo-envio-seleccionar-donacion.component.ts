import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Donacion} from '../../../../_services/lbservice/models';  
import { DonacionApi} from '../../../../_services/lbservice/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nuevo-envio-seleccionar-donacion',
  templateUrl: './nuevo-envio-seleccionar-donacion.component.html',
  styleUrls: ['./nuevo-envio-seleccionar-donacion.component.css']
})
export class NuevoEnvioSeleccionarDonacionComponent implements OnInit {

	donaciones = [];
	base = environment.backendUrl;

	@Input()  name: string;
  	@Output() enviarIdDonacion = new EventEmitter<string>();
	constructor(
		private donacionApi:DonacionApi,
		) { 
		//Tengo que obtener todas las donaciones que no pertenecen a un envio
		//Es decir todas las que tengan idEnvio = null 
		//Otra opcion investigar como pasar funciones para filtrar los donantes que no tienen donaciones -> donanteApi.find({order: 'username ASC', include:{relation:'donaciones', scope:{fields:['estado','id'],where:{"estado":"nueva"}, include:{relation:'traslado'}}}}).subscribe((donaciones:Donante[])=>{
		donacionApi.find({fields: {idDonante:true,id:true,filename:true},include:[{relation:'donante', scope:{fields:['username']}},{relation:'traslado',scope:{fields:['descripcion']}}],where:{"estado":"nueva"}}).subscribe((donaciones:Donacion[])=>{
			this.donaciones = donaciones;
		})
	}

    enviarAlPadre(id:string){
			this.enviarIdDonacion.emit(id);
    }

	ngOnInit() {}

}
