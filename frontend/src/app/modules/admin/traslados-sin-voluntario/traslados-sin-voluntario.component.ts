import { Component, OnInit } from '@angular/core';
import { Beneficiario, EnvioParaBeneficiario, Donacion, Donante, DescripcionGeneral, Traslado, Voluntario, Ubicacion, DescripcionDetallada } from '../../../_services/lbservice/models'
import { BeneficiarioApi, EnvioParaBeneficiarioApi ,DonacionApi, DonanteApi, DescripcionGeneralApi, TrasladoApi, VoluntarioApi, UbicacionApi, DescripcionDetalladaApi } from '../../../_services/lbservice/services'
import {Location} from '@angular/common';
import { VoluntariosService } from 'src/app/_services/voluntarios.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiRequestsService } from 'src/app/_services/api-requests.service';
import { DataShareService } from 'src/app/_services/data-share.service';


@Component({
  selector: 'app-traslados-sin-voluntario',
  templateUrl: './traslados-sin-voluntario.component.html',
  styleUrls: ['./traslados-sin-voluntario.component.css']
})
export class TrasladosSinVoluntarioComponent implements OnInit {

	traslados = [];
	abortarTraslado : Traslado;
	constructor(private data:DataShareService, private requester: ApiRequestsService, private router:Router,private service: VoluntariosService,private apiBeneficiario: BeneficiarioApi,private apiEnvio:EnvioParaBeneficiarioApi ,private apiDescGeneral: DescripcionGeneralApi, private apiUbicacion:UbicacionApi, private apiDonante:DonanteApi, private apiDonacion:DonacionApi,private _location: Location, private apiTraslado: TrasladoApi) {
		requester.getAllTrasladosSinVoluntario().then(arr => this.traslados =arr)
	 } //Fin constructor

	buscarVoluntariosParaTraslado(traslado){
		let ruta = '/buscar-voluntarios/'+traslado[6].id+'/'+encodeURIComponent(traslado[0])+'/'+encodeURIComponent(traslado[1]);
		this.router.navigate([ruta]);
	}

	cancelarTraslado(traslado){
		this.abortarTraslado = traslado;
	}
	onConfirmarCancelacionDeTraslado(){
		this.apiTraslado.patchAttributes(this.abortarTraslado.id,{estado:"abortado"}).subscribe(()=>{this.router.navigateByUrl('panel-de-control');alert("Se borró el traslado")})
	}
	ngOnInit() {
    this.data.cambiarTitulo("Traslados sin vouluntario");

	}

}
