import { Component, OnInit } from '@angular/core';
import { Donacion, Donante, Traslado, Voluntario, Ubicacion } from '../../../_services/lbservice/models'
import { BeneficiarioApi, EnvioParaBeneficiarioApi ,DonacionApi, DonanteApi, DescripcionGeneralApi, TrasladoApi, VoluntarioApi, UbicacionApi } from '../../../_services/lbservice/services'
import {Location} from '@angular/common';
import { BALP } from '../../../_models/BALP';
import { FilaTrasladoPendiente } from '../../admin/traslados-pendientes/FilaTrasladoPendiente'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { InsigniasService } from 'src/app/_services/insignias.service';
import { ApiRequestsService } from 'src/app/_services/api-requests.service';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-mis-traslados',
  templateUrl: './mis-traslados.component.html',
  styleUrls: ['./mis-traslados.component.css']
})
export class MisTrasladosComponent implements OnInit {


  form : FormGroup;
  filas : FilaTrasladoPendiente[] = [];
  dirBALP : Ubicacion = (new BALP).ubicacionBALP;
  filasOriginal;
  public p:any;

  constructor(private data:DataShareService, private requester:ApiRequestsService,private insigniasService:InsigniasService,private apiVoluntario:VoluntarioApi, private route: ActivatedRoute, private router:Router,private voluntarioApi: VoluntarioApi,private apiBeneficiario: BeneficiarioApi,private apiEnvio:EnvioParaBeneficiarioApi ,private apiDescGeneral: DescripcionGeneralApi, private apiUbicacion:UbicacionApi, private apiDonante:DonanteApi, private apiDonacion:DonacionApi,public _location: Location, private apiTraslado: TrasladoApi) { 


    this.form = new FormGroup ({
    	nombre : new FormControl()
    });

    requester.getAllTrasladosOfVoluntario(this.apiVoluntario.getCachedCurrent().id).then(ans => this.filas = ans);

  }// Fin del constructor

  efectuar(traslado:Traslado,voluntario:Voluntario){
    traslado.estado = "entregado";
    traslado.fechaFin = new Date;
    console.log(traslado.fechaFin);
    voluntario.puntuacion = voluntario.puntuacion + traslado.puntaje;
    //Checkear si obtuvo insignia
    if (traslado.tipo=="donacion"){
      this.apiDonacion.findById(traslado.idDonacionTrasladadaAlBanco).subscribe((donacion:Donacion)=>{
        this.apiDonante.findById(donacion.idDonante).subscribe((donante:Donante)=>{
          donante.puntuacion=donante.puntuacion + traslado.peso;
          donante.totalDonado = donante.totalDonado + traslado.peso;
          donante.totalDonadoEsteMes = donante.totalDonadoEsteMes + traslado.peso;
          //Chequear insignias

          this.apiTraslado.patchAttributes(traslado.id,{
            "estado":"entregado",
            "fechaFin":traslado.fechaFin
          }).subscribe(()=>{
            this.apiVoluntario.patchAttributes(voluntario.id,{
              "puntuacion": voluntario.puntuacion
            }).subscribe(()=>{
              this.apiDonante.patchAttributes(donante.id,{
                "puntuacion":donante.puntuacion,
                "totalDonado":donante.totalDonado,
                "totalDonadoEsteMes":donante.totalDonadoEsteMes
              }).subscribe(()=>{
                //Listo
                console.clear();
                console.log("Se va a llamar a onDonacion y onTraslado");
                this.insigniasService.onDonacion(donante.id);
                this.insigniasService.onTraslado(voluntario.id);
              })
            })
          })
        })
      })
    } else {
      this.apiTraslado.patchAttributes(traslado.id,{
        "estado":"entregado",
        "fechaFin":traslado.fechaFin
      }).subscribe(()=>{
        this.apiVoluntario.patchAttributes(voluntario.id,{
          "puntuacion": voluntario.puntuacion
        }).subscribe(()=>{
          //Listo
          console.clear();
          console.log("Como el traslado no es de una donación solo se actualizaran las insignias del voluntario");
          this.insigniasService.onTraslado(voluntario.id);
        })
      })
    }
  }

  ngOnInit() {
		this.data.cambiarTitulo("Mis traslados");
  }

}