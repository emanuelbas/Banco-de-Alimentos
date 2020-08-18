import { Component, OnInit } from '@angular/core';
//Voy a usar el model que traje desde LB, tal vez haya que hacer una clase nueva en Angular
import { Beneficiario, Ubicacion } from '../../../_services/lbservice/models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { BeneficiarioApi, UbicacionApi } from '../../../_services/lbservice/services';
import { AddressConverter } from '../../../_models/AddressConverter';
import { LoopBackConfig, BaseLoopBackApi } from '../../../_services/lbservice';
import { Route } from '@angular/compiler/src/core';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
	selector: 'app-registrar-beneficiario',
	templateUrl: './registrar-beneficiario.component.html',
	styleUrls: ['./registrar-beneficiario.component.css']
})
export class RegistrarBeneficiarioComponent implements OnInit {
	nuevoBeneficiario: Beneficiario;
	registrarBeneficiario: FormGroup;
	convertidorDeDirecciones: AddressConverter;

	constructor(private data:DataShareService, private ubicacionApi:UbicacionApi, private beneficiarioApi: BeneficiarioApi, private route: ActivatedRoute, private router: Router) {

		this.nuevoBeneficiario = new Beneficiario();
		this.convertidorDeDirecciones = new AddressConverter();
		this.registrarBeneficiario = new FormGroup({
			nombreOrganizacion: new FormControl(),
			direccion: new FormControl(),
			cantidadAtendidos: new FormControl(),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl(),
			passwordConfirm: new FormControl()
		});

	}

	onSubmit() {
		if (this.registrarBeneficiario.valid) {
			this.nuevoBeneficiario = new Beneficiario();
			this.nuevoBeneficiario.username = this.registrarBeneficiario.get("nombreOrganizacion").value;
			this.nuevoBeneficiario.cantidadAtendidos = this.registrarBeneficiario.get("cantidadAtendidos").value;
			this.nuevoBeneficiario.email = this.registrarBeneficiario.get("email").value;
			this.nuevoBeneficiario.password = this.registrarBeneficiario.get("password").value;

			this.beneficiarioApi.create(this.nuevoBeneficiario).subscribe((beneficiarioCreado: Beneficiario) => {
				let ubicacion:Ubicacion;
				ubicacion=new Ubicacion;
				ubicacion.beneficiarioId = beneficiarioCreado.id;
				ubicacion.direccion =  this.registrarBeneficiario.get("direccion").value;
				ubicacion.puntoGeografico = this.convertidorDeDirecciones.coordinateForAddress(ubicacion.direccion);
				this.ubicacionApi.create(ubicacion).subscribe(()=>{
				 	this.router.navigateByUrl("/login");
				 	alert('Se registró exitosamente');
				}) //ubicacion	
			})//beneficiario
		} else {
			alert('Por favor, completa los datos solicitados'); 	  
		}
	}//submit


	get emailIsInvalid() {
		return this.registrarBeneficiario.get('email').dirty && !this.registrarBeneficiario.get('email').valid
	}

	get passwordsNotEquals() {
		return this.registrarBeneficiario.get('passwordConfirm').dirty && (this.registrarBeneficiario.get('password').value != this.registrarBeneficiario.get('passwordConfirm').value)
	}

	get nombreOrganizacion() {
		return this.registrarBeneficiario.get('nombreOrganizacion')
	}
	get direccion() {
		return this.registrarBeneficiario.get('direccion')
	}
	get email() {
		return this.registrarBeneficiario.get('email')
	}	
	get cantidadAtendidos() {
		return this.registrarBeneficiario.get('cantidadAtendidos')
	}
	get password() {
		return this.registrarBeneficiario.get('password')
	}
	get passwordConfirm() {
		return this.registrarBeneficiario.get('passwordConfirm')
	}			


	ngOnInit() {
    this.data.cambiarTitulo("Registro del beneficiario");
		document.getElementById('navbar').classList.add('beneficiario-color');		
	}

}
