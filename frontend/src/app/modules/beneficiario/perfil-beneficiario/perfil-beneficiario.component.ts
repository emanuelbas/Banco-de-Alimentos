import { Component, OnInit } from '@angular/core';
import { Beneficiario, Ubicacion } from '../../../_services/lbservice/models';
import { Router, ActivatedRoute } from '@angular/router';
import { BeneficiarioApi, UbicacionApi } from '../../../_services/lbservice/services';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
	selector: 'app-perfil-beneficiario',
	templateUrl: './perfil-beneficiario.component.html',
	styleUrls: ['./perfil-beneficiario.component.css']
})
export class PerfilBeneficiarioComponent implements OnInit {

	loggedBeneficiario: Beneficiario;
	username: string;
	address: string = 'Cargando..';
	cantAtendidos: number;
	email: string;
	constructor(private data:DataShareService, private ubiApi: UbicacionApi, private beneficiarioApi: BeneficiarioApi, private route: ActivatedRoute, public router: Router) {

		this.loggedBeneficiario = beneficiarioApi.getCachedCurrent();
		this.beneficiarioApi.getUbicacion(this.loggedBeneficiario.id, true).subscribe((ubicacion: Ubicacion) => {
			this.address = ubicacion.direccion;	})
		this.username = this.loggedBeneficiario.username;
		this.cantAtendidos = this.loggedBeneficiario.cantidadAtendidos;
		this.email = this.loggedBeneficiario.email;
	}


	ngOnInit() {
		this.data.cambiarTitulo("Mis datos");
	}

}
