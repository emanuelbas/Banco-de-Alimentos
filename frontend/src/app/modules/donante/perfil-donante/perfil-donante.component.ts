import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar, faCandyCane, faGift, faEgg, faGifts , faHandsHelping, faDonate } from '@fortawesome/free-solid-svg-icons'
import { UbicacionApi, DonanteApi, PersonaDeContactoApi, InsigniaApi } from '../../../_services/lbservice/services';
import { Donante, TipoInsignia } from '../../../_services/lbservice/models';  
import { InsigniasService } from '../../../_services/insignias.service';
import { DataShareService } from 'src/app/_services/data-share.service';


@Component({
  selector: 'app-perfil-donante',
  templateUrl: './perfil-donante.component.html',
  styleUrls: ['./perfil-donante.component.css']
})
export class PerfilDonanteComponent implements OnInit {


	  //Estos son los iconos
  	faCandyCane=faCandyCane;
  	faGift=faGift;
  	faGifts=faGifts;
  	faHandsHelping=faHandsHelping;
  	faEgg=faEgg;
  	faDonate=faDonate;
  	faStar=faStar;
    public p:any;

  	//Artributos que quiero mostrar
    iconos = [];
  	donante: Donante;
  	personas;
  	direccion = 'Cargando..';
    badges = []; //Se 0:Nombre, 1:icono, 2:fechaOtorgada, 3:vto
  constructor(private data:DataShareService, private insigniasService:InsigniasService,private apiInsignia: InsigniaApi,private apiUbicacion: UbicacionApi, private apiDonante:DonanteApi, private apiPersona:PersonaDeContactoApi,private router:Router) { 
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
    
    //Llamo a la api para leer los datos a mostrar
    this.donante = apiDonante.getCachedCurrent();
  	apiDonante.getPersonasDeContacto(this.donante.id).subscribe((personas)=>{
  		this.personas = personas;
  		apiDonante.getUbicacion(this.donante.id,true).subscribe((ubicacion)=>{
        this.direccion = ubicacion.direccion;
        insigniasService.getInsigniasDonante(this.donante.id).then((insignias)=>{
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
      })
  	}); //fin primer promesa
  } //Fin constructor

  ngOnInit() {
		this.data.cambiarTitulo("Mis datos");
  }

}

