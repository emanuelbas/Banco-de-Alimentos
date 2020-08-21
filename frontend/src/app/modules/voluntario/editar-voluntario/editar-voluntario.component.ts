import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Voluntario, Vehiculo, Volumen } from '../../../_services/lbservice/models';
import { VoluntarioApi, VehiculoApi, VolumenApi } from '../../../_services/lbservice/services';
import { AddressConverter } from '../../../_models/AddressConverter';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-editar-voluntario',
  templateUrl: './editar-voluntario.component.html',
  styleUrls: ['./editar-voluntario.component.css']
})
export class EditarVoluntarioComponent implements OnInit {

  voluntario: Voluntario;
  vehiculo: Vehiculo;
  volumen: Volumen;
  ubicacion: string;
  idVoluntario: string;
  form: FormGroup;
  addressConverter: AddressConverter;

  constructor(private data:DataShareService, public _location:Location, private apiVoluntario: VoluntarioApi, private apiVehiculo: VehiculoApi, private apiVolumen: VolumenApi, private router: Router) {

    this.form = new FormGroup({
      // atributos del voluntario
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.email]),
      celular: new FormControl('', [Validators.required]),
      observaciones: new FormControl(),
      distancia: new FormControl(),

      // atributos de la ubicación del voluntario
      ubicacion: new FormControl('', [Validators.required]),

      // atributos del vehículo del voluntario
      marca: new FormControl(),
      modelo: new FormControl(),
      patente: new FormControl(),

      // atributos del volumen del voluntario
      alto: new FormControl(),
      ancho: new FormControl(),
      largo: new FormControl(),
    });


    this.voluntario = apiVoluntario.getCachedCurrent();
    this.idVoluntario = this.voluntario.id;
    apiVoluntario.findOne({where: {id: this.idVoluntario},include:  [{"vehiculo": "volumen"},"ubicacion"] }).subscribe((voluntario:Voluntario) => {
      this.vehiculo = voluntario.vehiculo;
      this.form.controls["marca"].setValue(this.vehiculo.marca);
      this.form.controls["modelo"].setValue(this.vehiculo.modelo);
      this.form.controls["patente"].setValue(this.vehiculo.patente);
      this.volumen = voluntario.vehiculo.volumen;
      this.form.controls["alto"].setValue(this.volumen.alto);
      this.form.controls["ancho"].setValue(this.volumen.ancho);
      this.form.controls["largo"].setValue(this.volumen.largo);
      this.ubicacion = voluntario.ubicacion.direccion;
      this.form.controls["ubicacion"].setValue(this.ubicacion);
      this.form.controls["dni"].setValue(voluntario.dni);
      this.form.controls["nombre"].setValue(voluntario.nombre);
      this.form.controls["apellido"].setValue(voluntario.apellido);
      this.form.controls["username"].setValue(voluntario.username);
      this.form.controls["email"].setValue(voluntario.email);
      this.form.controls["celular"].setValue(voluntario.telefono);
      this.form.controls["distancia"].setValue(voluntario.distanciaMaxima);
      this.form.controls["observaciones"].setValue(voluntario.observaciones);
      })
    }

  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get dni() { return this.form.get('dni'); }
  get direccion() { return this.form.get('ubicacion'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get celular() { return this.form.get('celular'); }
  get password1() { return this.form.get('password1'); }
  get password2() { return this.form.get('password2'); }
  get distancia() { return this.form.get('distancia'); }
  get observaciones() { return this.form.get('observaciones') }

  get emailIsInvalid() {
    return this.form.get('email').dirty && !this.form.get('email').valid
  }

  // ACCION QUE DISPARA EL BOTON DE ACTUALIZAR VOLUNTARIO
  onSubmit() {
    if (this.form.valid) {
      // capturo y actualizo los atributos del voluntario 

      this.voluntario.nombre = this.form.get("nombre").value;
      this.voluntario.apellido = this.form.get("apellido").value;
      this.voluntario.dni = this.form.get("dni").value;
      this.voluntario.username = this.form.get("username").value;
      this.voluntario.email = this.form.get("email").value;
      this.voluntario.telefono = this.form.get("celular").value;
      this.voluntario.observaciones = this.form.get("observaciones").value;
      this.voluntario.distanciaMaxima = this.form.get("distancia").value;

      //    this.ubicacion = this.form.get("direccion").value;            

      // capturo y actualizo los datos del vehículo del voluntario
      this.vehiculo.marca = this.form.get("marca").value;
      this.vehiculo.modelo = this.form.get("modelo").value;
      this.vehiculo.patente = this.form.get("patente").value;


      // capturo y actualizo el volumen del vehículo del voluntario"
      this.volumen.alto = this.form.get("alto").value;
      this.volumen.ancho = this.form.get("ancho").value;
      this.volumen.largo = this.form.get("largo").value;


      //Marco que tiene vehiculo
      if (this.form.get("marca").value != null) {
        this.voluntario.tieneVehiculo = "si"
      }

      // Se debe actualizar el voluntario, su vehículo y el volumen del mismo 

      // Actualizo al voluntario
      this.apiVoluntario.patchAttributes(this.idVoluntario, {
        "nombre": this.voluntario.nombre,
        "apellido": this.voluntario.apellido,
        "dni": this.voluntario.dni,
        "username": this.voluntario.username,
        "email": this.voluntario.email,
        "telefono": this.voluntario.telefono,
        "distanciaMaxima": this.voluntario.distanciaMaxima,
        "observaciones": this.voluntario.observaciones,
        "tieneVehiculo": this.voluntario.tieneVehiculo
      }).subscribe(() => {
        console.log('Voluntario post actualización:', this.voluntario)
        // Actualizo el vehículo del voluntario (el patch de la api de vehículos recibe un id de vehículo -segun loopback-)
        this.apiVehiculo.patchAttributes(this.vehiculo.id, {
          "marca": this.vehiculo.marca,
          "modelo": this.vehiculo.modelo,
          "patente": this.vehiculo.patente
        }).subscribe(() => {
          console.log('Vehículo post actualización:', this.vehiculo)
        })
        // Actualizo el volumen del vehículo del voluntario (el patch de la api de volumen recibe un id de volumen -segun loopback-)
        this.apiVolumen.patchAttributes(this.volumen.id, {
          "alto": this.volumen.alto,
          "ancho": this.volumen.ancho,
          "largo": this.volumen.largo
        }).subscribe(() => {
          // En el último update lanzo el alert 
          console.log('Volumen post actualización:', this.volumen)
        })
        alert('El voluntario ha sido actualizado correctamente')
        this.router.navigateByUrl("/perfil-voluntario");
      })
    } else {
      alert('Por favor, completa los datos solicitados');
    }
  }

  ngOnInit() {
    this.data.cambiarTitulo("Editar mis datos");
  }

}
