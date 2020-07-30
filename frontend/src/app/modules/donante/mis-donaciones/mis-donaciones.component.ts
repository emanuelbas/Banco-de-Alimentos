import { Component, OnInit } from '@angular/core';
import { Donacion, Donante, DescripcionGeneral, Traslado, Voluntario } from '../../../_services/lbservice/models'
import { DonacionApi, DonanteApi } from '../../../_services/lbservice/services'
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiRequestsService} from '../../../_services/api-requests.service';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-mis-donaciones',
  templateUrl: './mis-donaciones.component.html',
  styleUrls: ['./mis-donaciones.component.css']
})
export class MisDonacionesComponent implements OnInit {

	donaciones=[];
	datosDeDonaciones=[];
	loggedDonante : Donante;
	public p:any;

	constructor(private data:DataShareService, private requester:ApiRequestsService,private _location: Location,apiDonante:DonanteApi,public route: ActivatedRoute, public router: Router) {
		this.loggedDonante = apiDonante.getCachedCurrent();
		requester.getAllDonacionesOf(this.loggedDonante.id).then(ans => this.datosDeDonaciones = ans);
	}

	ngOnInit() {
		this.data.cambiarTitulo("Mis donaciones");
	}

}
