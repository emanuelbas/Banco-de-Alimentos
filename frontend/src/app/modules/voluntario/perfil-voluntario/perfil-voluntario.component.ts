import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Voluntario, Vehiculo, Volumen, Insignia, TipoInsignia } from '../../../_services/lbservice/models';
import { VoluntarioApi, VehiculoApi, VolumenApi, InsigniaApi } from '../../../_services/lbservice/services';
import { faStar, faCandyCane, faGift, faEgg, faGifts , faHandsHelping, faDonate } from '@fortawesome/free-solid-svg-icons'
import { InsigniasService } from '../../../_services/insignias.service';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-perfil-voluntario',
  templateUrl: './perfil-voluntario.component.html',
  styleUrls: ['./perfil-voluntario.component.css']
})
export class PerfilVoluntarioComponent implements OnInit {

  voluntario: Voluntario;
  vehiculo: Vehiculo;
  volumen: Volumen;
  ubicacion: string;
  form: FormGroup;

      //Estos son los iconos
    faCandyCane=faCandyCane;
    faGift=faGift;
    faGifts=faGifts;
    faHandsHelping=faHandsHelping;
    faEgg=faEgg;
    faDonate=faDonate;
    faStar=faStar;

    iconos = [];
    badges = []; //Se 0:Nombre, 1:icono, 2:fechaOtorgada, 3:vto

  constructor(private data:DataShareService, private insigniasService: InsigniasService,private apiInsignia: InsigniaApi, private apiVoluntario: VoluntarioApi, apiVehiculo: VehiculoApi, apiVolumen: VolumenApi, public router: Router) {
   
    //Esto es como un diccionario que uso para convertir texto de la api en iconos mostrables
    this.iconos=[
    ['faEgg',faEgg],
    ['faCandyCane',faCandyCane],
    ['faGift',faGift],
    ['faGifts',faGifts],
    ['faHandsHelping',faHandsHelping],
    ['faDonate',faDonate],
    ['faStar',faStar],
    ];

    this.form = new FormGroup({
      // atributos del voluntario
      nombre: new FormControl(),
      apellido: new FormControl(),
      dni: new FormControl(),
      ubicacion: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      celular: new FormControl(),
      password1: new FormControl(),
      password2: new FormControl(),
      distancia: new FormControl(),
      observaciones: new FormControl(),
    
      // atributos del vehículo
      marca: new FormControl(),
      modelo: new FormControl(),
      patente: new FormControl(),

      // atributos del volumen
      alto: new FormControl(),
      ancho: new FormControl(),
      largo: new FormControl(),

    });
    
   // Promesas para obtener los datos del voluntario logueado
    this.voluntario = apiVoluntario.getCachedCurrent();
    this.apiVoluntario.findById(this.voluntario.id,{include: [{"vehiculo":"volumen"},"ubicacion"]}).subscribe((vol : Voluntario) =>{
      this.volumen = vol.vehiculo.volumen;
      if (vol.vehiculo != null) {this.vehiculo = vol.vehiculo}
      this.ubicacion = vol.ubicacion.direccion
    })
    this.insigniasService.getInsigniasVoluntario(apiVoluntario.getCachedCurrent().id).then((insignias:Insignia[])=>{
      for (let insignia of insignias){
        apiInsignia.getTipoInsignia(insignia.id,true).subscribe((tipodeinsignia:TipoInsignia)=>{
            let parNombreIcono = this.iconos.find(elemento => elemento[0] == tipodeinsignia.imagen)
            let icono = parNombreIcono[1];
            this.badges.push([
               tipodeinsignia.nombre,
               icono,
               insignia.fechaOtorgada,
               insignia.fechaVencimiento
              ]);
          })            
        } //Termina el for
     })				

  }

  ngOnInit() {
		this.data.cambiarTitulo("Mis datos");
  }

}
