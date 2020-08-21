import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Ubicacion, Donante } from '../../../_services/lbservice/models';
import { DonanteApi, VehiculoApi, VolumenApi, UbicacionApi } from '../../../_services/lbservice/services';
import { AddressConverter } from '../../../_models/AddressConverter';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-editar-donante',
  templateUrl: './editar-donante.component.html',
  styleUrls: ['./editar-donante.component.css']
})
export class EditarDonanteComponent implements OnInit {

  form: FormGroup;
  addressConverter: AddressConverter;
  donante;
  ubicacion;

  constructor(private data:DataShareService, public _location:Location, private apiUbicacion: UbicacionApi, private apiDonante: DonanteApi, apiVehiculo: VehiculoApi, apiVolumen: VolumenApi, private router: Router) { 

    this.form = new FormGroup({   
      cuil: new FormControl('', [Validators.required]),
      ubicacion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.email])
     });
    this.addressConverter = new AddressConverter;
    apiDonante.findById(this.apiDonante.getCachedCurrent().id).subscribe((donante:Donante)=>{
      apiDonante.getUbicacion(donante.id,true).subscribe((ub)=>{
        this.ubicacion= ub.direccion;
        console.log(ub);
        this.form.controls["cuil"].setValue(donante.cuil);
        this.form.controls["ubicacion"].setValue(ub.direccion);
        this.form.controls["email"].setValue(donante.email);
        
        /* Sobre la lectura de los datos a mostrar

          Cuidado, no usar los datos del usuario catcheado para mostrar
          ya que se quedan ahí aún después de modificiarlos.
          Es mejor pedirlos a la api para mantenerlos actualizados

        */
      })      
    })

   }

   get cuil() { return this.form.get('cuil'); }
   get direccion() { return this.form.get('ubicacion'); }
   get email() { return this.form.get('email'); }

   get emailIsInvalid() {
		return this.form.get('email').dirty && !this.form.get('email').valid
	}


  onSubmit() {
    if (this.form.valid) {
      let cuil = this.form.get("cuil").value;
      let ubicacion:Ubicacion = new Ubicacion;
      ubicacion.direccion=this.form.get("ubicacion").value;
      ubicacion.puntoGeografico=this.addressConverter.coordinateForAddress(ubicacion.direccion);
      ubicacion.idDonante=this.apiDonante.getCachedCurrent().id;
      let email = this.form.get("email").value;

      this.apiDonante.patchAttributes(this.apiDonante.getCachedCurrent().id,{
        "cuil": cuil,
        "email": email
      }).subscribe(()=>{
        this.apiDonante.getUbicacion(this.apiDonante.getCachedCurrent().id,true).subscribe((ubi:Ubicacion)=>{
          this.apiUbicacion.patchAttributes(ubi.id,{
            "direccion": ubicacion.direccion,
            "puntoGeografico": ubicacion.puntoGeografico
          }).subscribe(()=>{
            alert("Se actualizaron los datos. 👌")
          })
        })

      })
      
    }  else {
			alert('Por favor, completa los datos solicitados');
		}
  }

  ngOnInit() {
		this.data.cambiarTitulo("Editar mis datos");
  }

}
