import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoluntariosService } from 'src/app/_services/voluntarios.service';
import { VehiculoApi, VoluntarioApi, TrasladoApi } from '../../../_services/lbservice/services';
import { Vehiculo, Voluntario, Traslado, Volumen } from '../../../_services/lbservice/models';
import { Location } from '@angular/common';
import { environment } from "src/environments/environment";
import { HttpService } from 'src/app/_services/http.service';
import { DataApiService } from 'src/app/_services/data-api.service';
import { DataShareService } from 'src/app/_services/data-share.service';


@Component({
  selector: 'app-buscar-voluntario',
  templateUrl: './buscar-voluntario.component.html',
  styleUrls: ['./buscar-voluntario.component.css']
})
export class BuscarVoluntarioComponent implements OnInit {


//Necesito recibir la ID del traslado, la distancia y el volumen
	idTraslado:string;
	dirOrigen:string;
	dirDestino:string;
  capacidad:number;
	distancia:number;
	volumenTotal:number;
  url:string;
  voluntarios : Voluntario[] = [];
  traslado:Traslado;
  fechaDeHoy = Date.now()
  public tiempoDeNotificacion: number = 24;
  public p:any;
  

  constructor(private data:DataShareService, public dataApi:DataApiService, private http:HttpService,public _location:Location, private apiVehiculo:VehiculoApi,private apiVoluntario:VoluntarioApi,private apiTraslado:TrasladoApi, private route:ActivatedRoute,private service:VoluntariosService, private router: Router) {
    //buscar-voluntarios/:idTraslado/:origen/:destino
  	this.idTraslado = route.snapshot.paramMap.get("idTraslado");
  	this.dirOrigen = route.snapshot.paramMap.get("origen");
  	this.dirDestino = route.snapshot.paramMap.get("destino");
    this.url = environment.frontendUrl+'/asignar-traslado/'+this.idTraslado;
    this.dataApi.getTrasladoPorId(this.idTraslado).subscribe((traslado:Traslado)=>{
      this.traslado = traslado
      this.volumenTotal = traslado.volumenTotal;
      this.distancia = Math.round(traslado.distancia);
      this.dataApi.getVoluntariosQueRecorrenUnaDistancia(this.distancia).subscribe((voluntarios:Voluntario[])=>{
        this.voluntarios= [];
        for(let voluntario of voluntarios){
          if (voluntario.tieneVehiculo == 'si') {
            this.dataApi.getVehiculoDeVoluntario(voluntario.id).subscribe((vehiculo:Vehiculo)=>{
              this.dataApi.getVolumenDelVehiculo(vehiculo.id).subscribe((volumen:Volumen)=>{
                  this.capacidad=volumen.alto*volumen.ancho*volumen.largo;
                  if (this.capacidad>=this.volumenTotal){
                    this.voluntarios.push(voluntario);
                    console.log('Se agregó un voluntario');
                  } //Fin if volumen >
                }) // fin getvolumen
              }) //Fin gevehiculo
            } 
        }//Fin for voluntari
      }) //apivoluntarios      
    }) //find traslado
  } //constructor

  enviarEmailA(casilla,tiempoNotificacion){
    this.sendTo(casilla,tiempoNotificacion);
  }

  enviarEmails(tiempoNotificacion){
    this.sendTo(this.voluntarios.map(voluntario => voluntario.email).join(', '),tiempoNotificacion);
  }

  ngOnInit() {
    this.data.cambiarTitulo("Buscar voluntario para traslado");
  }

  sendTo(casilla,duracionDeNotificacion){
      let user = {
      name: 'Voluntario',
      email: casilla,
      html: '<body style="border-style: dashed; padding: 25px"><h1 style="text-align: center;color:#f94116;"> ¡Tenés un traslado disponible! </h1><p style="font-size: 20px">Desde BALP te invitamos a realizar un traslado, inicia sesión en la app e ingresa al siguiente enlace para ver detalles:<br><br>'+ this.url + "</p></body>",
      subject: 'Traslado disponible'
    }
    this.http.sendEmail(environment.backendUrl+"/sendmail",user ).subscribe(
      data => {
        let res:any = data; 
        alert('Se envio un email a '+casilla+' con la siguiente URL: '+this.url);
        let fechaVtoNotificacion = new Date();
        fechaVtoNotificacion.setTime(this.fechaDeHoy+(duracionDeNotificacion*60*60*1000))
        this.traslado.fechaVencimientoInvitacion = fechaVtoNotificacion;
        this.apiTraslado.updateAttributes(this.traslado.id,this.traslado).subscribe(()=>{console.log(this.traslado.fechaVencimientoInvitacion)})
      },
      err => {
        console.log(err);
      }
    );
  }

}
