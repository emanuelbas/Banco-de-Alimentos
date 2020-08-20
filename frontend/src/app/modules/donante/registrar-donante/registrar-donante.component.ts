import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UbicacionApi, DonanteApi, PersonaDeContactoApi } from '../../../_services/lbservice/services';
import { Ubicacion, Donante, PersonaDeContacto } from '../../../_services/lbservice/models';
import { AddressConverter } from '../../../_models/AddressConverter';
import { Validators } from '@angular/forms';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
	selector: 'app-registrar-donante',
	templateUrl: './registrar-donante.component.html',
	styleUrls: ['./registrar-donante.component.css']
})
export class RegistrarDonanteComponent implements OnInit {

	form: FormGroup;
	nuevoDonante: Donante;
	colPersonasDeContacto = [];
	convertidorDeDirecciones: AddressConverter;


	constructor(private data:DataShareService, private ubicacionApi: UbicacionApi, private personasDeContactoApi: PersonaDeContactoApi, private donanteApi: DonanteApi, private route: ActivatedRoute, private router: Router) {

		//Se crea el nuevo donante y los controladores de los campos
		this.nuevoDonante = new Donante();

		//Instancio el convertidor de direcciones (mock)
		this.convertidorDeDirecciones = new AddressConverter();

		this.form = new FormGroup({
			razonSocial: new FormControl(),
			cuil: new FormControl('', [Validators.required]),
			direccion: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password1: new FormControl('', [Validators.required]),
			password2: new FormControl('', [Validators.required]),
			personaNombre: new FormControl(),
			personaApellido: new FormControl(),
			personaDni: new FormControl(),
			personaEmail: new FormControl(),
			personaCelular: new FormControl()
		});
	}

	get razonSocial() { return this.form.get('razonSocial'); }
	get cuil() { return this.form.get('cuil'); }
	get direccion() { return this.form.get('direccion'); }
	get email() { return this.form.get('email'); }
	get password1() { return this.form.get('password1'); }
	get password2() { return this.form.get('password2'); }
	get personaNombre() { return this.form.get('personaNombre'); }
	get personaApellido() { return this.form.get('personaApellido'); }
	get personaDni() { return this.form.get('personaDni'); }
	get personaEmail() { return this.form.get('personaEmail'); }
	get personaCelular() { return this.form.get('personaCelular'); }

	get emailIsInvalid() {
		return this.form.get('email').dirty && !this.form.get('email').valid
	}

	get emailIsInvalidPersona() {
		return this.form.get('personaEmail').dirty && !this.form.get('personaEmail').valid
	}

	get passwordsNotEquals() {
		return this.form.get('password2').dirty && (this.form.get('password1').value != this.form.get('password2').value)
	}


	//Se invoca para agregar una Persona de Contacto
	agregarContacto() {
		//Validar los campos
		if ((this.form.get("personaEmail").value == null) ||
			(this.form.get("personaApellido").value == null) ||
			(this.form.get("personaDni").value == null) ||
			(this.form.get("personaEmail").value == null) ||
			(this.form.get("personaCelular").value == null)) {
			alert('Por favor, complete todos los datos solicitados de la persona de contacto para poder registrarla');
			return 0;
		}


		//Agregar la persona al Array
		let nuevaPersona = new PersonaDeContacto;
		nuevaPersona.nombre = this.form.get("personaNombre").value;
		nuevaPersona.apellido = this.form.get("personaApellido").value;
		nuevaPersona.dni = this.form.get("personaDni").value;
		nuevaPersona.email = this.form.get("personaEmail").value;
		nuevaPersona.telefono = this.form.get("personaCelular").value;
		this.colPersonasDeContacto.push(nuevaPersona);

		//Limpiar los campos
		this.form.get("personaNombre").reset();
		this.form.get("personaApellido").reset();
		this.form.get("personaDni").reset();
		this.form.get("personaEmail").reset();
		this.form.get("personaCelular").reset();

	}

	//Se invoca cuando se "Registra el nuevo donante"
	onSubmit() {
		if (this.form.valid) {

			if (this.colPersonasDeContacto.length == 0) {
				alert('Debe ingresar al menos una persona de contacto');
				return 0;
			}

			//Postear un donante nuevo con los datos recibidos
			this.nuevoDonante = new Donante;
			this.nuevoDonante.username = this.form.get("razonSocial").value;
			this.nuevoDonante.cuil = this.form.get("cuil").value;
			this.nuevoDonante.email = this.form.get("email").value;
			this.nuevoDonante.password = this.form.get("password1").value;
			this.nuevoDonante.ubicacion = this.generarUbicacion(this.form.get("direccion").value);
			this.nuevoDonante.personasDeContacto = [];

			//Llamo a la api para crear el donante y con su id creo las otras entidades que le pertenecen
			this.donanteApi.create(this.nuevoDonante).subscribe((donanteCreado: Donante) => {
				//Creo su ubicación
				this.nuevoDonante.ubicacion.idDonante = donanteCreado.id;
				this.ubicacionApi.create(this.nuevoDonante.ubicacion).subscribe(() => {
					//Creo sus contactos
					let contadorContactos = 0;
					let totalDeContactos = this.nuevoDonante.personasDeContacto.length;
					for (let persona of this.colPersonasDeContacto) {
						persona.idDonante = donanteCreado.id;
						this.personasDeContactoApi.create(persona).subscribe(() => {
							//Si soy el último contacto me voy
							if (contadorContactos < totalDeContactos) {
								//No soy el último
								contadorContactos++
							} else {
								//Soy el último
								this.router.navigateByUrl("/login");
								alert('Se registró exitosamente');
							}
						})
					}
				})
			});
		}
		else {
			alert('Por favor, completa los datos solicitados');
		}
	}

	generarUbicacion(direccion: string) {
		let nuevaUbicacion = new Ubicacion;
		nuevaUbicacion.direccion = direccion;
		nuevaUbicacion.puntoGeografico = this.convertidorDeDirecciones.coordinateForAddress(direccion);
		return nuevaUbicacion;
	}

	ngOnInit() {
    this.data.cambiarTitulo("");
	}

}
