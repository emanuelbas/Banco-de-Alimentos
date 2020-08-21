import { Component, OnInit } from '@angular/core';
import { Beneficiario, Ubicacion } from '../../../_services/lbservice/models';
import { Router, ActivatedRoute } from '@angular/router';
import { BeneficiarioApi, UbicacionApi } from '../../../_services/lbservice/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressConverter } from '../../../_models/AddressConverter';
import { DataShareService } from 'src/app/_services/data-share.service';

//Revisar si se usa
import { LoopBackConfig, BaseLoopBackApi } from '../../../_services/lbservice';
import { Route } from '@angular/compiler/src/core';


@Component({
	selector: 'editar-beneficiario',
	templateUrl: './editar-beneficiario.component.html',
	styleUrls: ['./editar-beneficiario.component.css']
})

export class EditarBeneficiarioComponent implements OnInit {
	beneficiario: Beneficiario;
	direccion: string = 'Cargando..';
	addressConverter: AddressConverter;
	formBeneficiario: FormGroup;
	convertidorDeDirecciones: AddressConverter;
	ubicacion: Ubicacion;

	constructor(private data:DataShareService, private ubicacionApi: UbicacionApi, private beneficiarioApi: BeneficiarioApi, private route: ActivatedRoute, public router: Router) {
		this.beneficiario = beneficiarioApi.getCachedCurrent();
		this.beneficiarioApi.getUbicacion(this.beneficiario.id, true).subscribe((ubicacion: Ubicacion) => {
			this.ubicacion = ubicacion;
			this.direccion = ubicacion.direccion;
			this.addressConverter = new AddressConverter;
		})
		this.formBeneficiario = new FormGroup({
			username: new FormControl(this.beneficiario.username, [Validators.required]),
			direccion: new FormControl(this.direccion),
			cantidadAtendidos: new FormControl(this.beneficiario.cantidadAtendidos),
			email: new FormControl(this.beneficiario.email, [Validators.required, Validators.email]),
		});
	}


	get username() { return this.formBeneficiario.get('username') }
	get direccionForm() { return this.formBeneficiario.get('direccion') }
	get email() { return this.formBeneficiario.get('email') }
	get cantidadAtendidos() { return this.formBeneficiario.get('cantidadAtendidos') }

	get emailIsInvalid() {
		return this.formBeneficiario.get('email').dirty && !this.formBeneficiario.get('email').valid
	}

	ngOnInit() {
		this.data.cambiarTitulo("Editar mis datos");
	}

	onSubmit() {
		if (this.formBeneficiario.valid) {

			this.beneficiarioApi.patchAttributes(this.beneficiario.id, {
				"username": this.formBeneficiario.get("username").value,
				"cantidadAtendidos": this.formBeneficiario.get("cantidadAtendidos").value,
				"email": this.formBeneficiario.get("email").value
			}).subscribe((beneficiario: Beneficiario) => {

				this.ubicacionApi.patchAttributes(this.ubicacion.id, {
					"direccion": this.formBeneficiario.get("direccion").value,
					"puntoGeografico": this.addressConverter.coordinateForAddress(this.formBeneficiario.get("direccion").value)
				}).subscribe(() => {
					alert('Los datos se modificaron correctamente');
					this.router.navigateByUrl("/perfil-beneficiario");
				})

			})



		}
		else {
			alert('Por favor, completa los datos solicitados');
		}
		//ubicacion
	}//beneficiario

}

