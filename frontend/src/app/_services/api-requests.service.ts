import { Injectable } from '@angular/core';
import {
  Donante, Voluntario, DonanteApi, VoluntarioApi, Donacion, DonacionApi, Traslado,
  TrasladoApi, Ubicacion, DescripcionGeneral, EnvioParaBeneficiarioApi, BeneficiarioApi,
  DescripcionDetallada, EnvioParaBeneficiario, Beneficiario
} from './lbservice';
import { FilaTrasladoPendiente } from 'src/app/modules/admin/traslados-pendientes/FilaTrasladoPendiente';
import { BALP } from 'src/app/_models/BALP';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private voluntarioApi: VoluntarioApi,
    private donanteApi: DonanteApi,
    private donacionApi: DonacionApi,
    private trasladoApi: TrasladoApi,
    private envioApi: EnvioParaBeneficiarioApi,
    private beneficiarioApi: BeneficiarioApi
  ) {
  }

  get10HighScoredDonantes(): Promise<Donante[]> {
    return new Promise(resolve => {
      this.donanteApi.find<Donante>({
        order: 'puntuacion DESC',
        limit: 10
      }).subscribe((donantes) => {
        resolve(donantes)
      });
    });
  };

  get10HighScoredVoluntarios(): Promise<Voluntario[]> {
    return new Promise((resolve, reject) => {
      this.voluntarioApi.find<Voluntario>({
        order: 'puntuacion DESC',
        limit: 10
      }).subscribe((voluntarios) => {
        resolve(voluntarios)
      });
    });
  };

  getAllDonacionesOf(idDonante): Promise<any[]> {
    return new Promise(resolve => {
      let datosDeDonaciones = []
      this.donanteApi.getDonaciones(idDonante, { include: ["traslado", "descripcionDetallada", "descripcionGeneral"] })
        .subscribe((donaciones: Donacion[]) => {
          for (let donacion of donaciones) {
            if (typeof (donacion.descripcionGeneral) !== "undefined") {
              if (donacion.traslado.voluntarioId == null) {
                let tupla = [
                  donacion.id,
                  donacion.numero,
                  donacion.descripcionGeneral.descripcion,
                  (donacion.estado == 'Donación transportada por el propio donante') ? 'Trasportado por donante':'Sin asignar',
                  donacion.traslado.fechaEstimada,
                  donacion.traslado,
                  donacion
                ];
                datosDeDonaciones.push(tupla);
              } else {
                this.voluntarioApi.findById(donacion.traslado.voluntarioId).subscribe((voluntario: Voluntario) => {
                  let tupla = [
                    donacion.id,
                    donacion.numero,
                    donacion.descripcionGeneral.descripcion,
                    voluntario.nombre + ' ' + voluntario.apellido,
                    donacion.traslado.fechaEstimada,
                    donacion.traslado,
                    donacion
                  ];
                  datosDeDonaciones.push(tupla);
                }) //voluntario
              } //Else
            } //Fin desc general
            else {
              if (typeof (donacion.descripcionDetallada) !== "undefined") {
                if (donacion.traslado.voluntarioId == null) {
                  let tupla = [
                    donacion.id,
                    donacion.numero,
                    donacion.descripcionDetallada.descripcion,
                    (donacion.estado == 'Donación transportada por el propio donante') ? 'Trasportado por donante':'Sin asignar',
                    donacion.traslado.fechaEstimada,
                    donacion.traslado,
                    donacion
                  ];
                  datosDeDonaciones.push(tupla);
                } else {
                  this.voluntarioApi.findById(donacion.traslado.voluntarioId).subscribe((voluntario: Voluntario) => {
                    let tupla = [
                      donacion.id,
                      donacion.numero,
                      donacion.descripcionDetallada.descripcion,
                      voluntario.nombre + ' ' + voluntario.apellido,
                      donacion.traslado.fechaEstimada,
                      donacion.traslado,
                      donacion
                    ];
                    datosDeDonaciones.push(tupla);
                  }) //voluntario
                } //Else
              }
            } //Fin intentocon descripcion general
          } //for Donaciones  
        }); //Promesa get donaciones
      resolve(datosDeDonaciones)
    })
  }

  getAllTrasladosOfVoluntario(idVoluntario): Promise<FilaTrasladoPendiente[]> {
    return new Promise(resolve => {
      let filas: FilaTrasladoPendiente[] = [];
      let dirBALP = (new BALP).ubicacionBALP;
      this.trasladoApi.find<Traslado>({ "where": { "voluntarioId": idVoluntario } }).subscribe((traslados: Traslado[]) => {
        console.log(traslados);
        for (let traslado of traslados) {
          this.voluntarioApi.findById(traslado.voluntarioId).subscribe((voluntario: Voluntario) => {
            if (traslado.tipo == 'donacion') {
              this.donacionApi.findById(traslado.idDonacionTrasladadaAlBanco, { include: ["descripcionDetallada", "descripcionGeneral"] }).subscribe((donacion: Donacion) => {
                this.donanteApi.findById(donacion.idDonante, { include: "ubicacion" }).subscribe((donante: Donante) => {
                  if (typeof (donacion.descripcionGeneral) !== "undefined") {
                    filas.push(
                      new FilaTrasladoPendiente(traslado, voluntario, donacion, donante.ubicacion, dirBALP)
                    ) //fin push
                  } else {
                    if (typeof (donacion.descripcionDetallada) !== "undefined") {
                      filas.push(
                        new FilaTrasladoPendiente(traslado, voluntario, donacion, donante.ubicacion, dirBALP)
                      ) //fin push
                    } //Fin detallada
                  } //fin if/else
                }) //fin donante
              }) //Fin donacion  
            } else {
              //Caso envio
              //Pido envio
              this.envioApi.findById(traslado.idEnvioTrasladadoAUnBeneficiario, { include: { "beneficiario": "ubicacion" } }).subscribe((envio: EnvioParaBeneficiario) => {
                filas.push(
                  new FilaTrasladoPendiente(traslado, voluntario, envio, dirBALP, envio.beneficiario.ubicacion)
                )
              })
            } //Fin bifurcada
          }) //Fin voluntario				
        } //Fin for traslados
        resolve(filas)
      }) //Fin traslados
    });
  }



  getAllTrasladosSinVoluntario(): Promise<any[]> {
    return new Promise(resolve => {

      let balp = new BALP;
      let filas = []
      this.trasladoApi.find({
        where: {
          estado: 'pendiente de retiro'
        }
      }).subscribe((traslados: Traslado[]) => {
        let elementos = traslados.length;
        for (let traslado of traslados) {
          if (traslado.tipo == 'donacion') {
            this.donacionApi.findById(traslado.idDonacionTrasladadaAlBanco).subscribe((donacion: Donacion) => {
              this.donanteApi.findById(donacion.idDonante, { include: "ubicacion" }).subscribe((donante: Donante) => {
                let origen = donante.ubicacion.direccion;
                let destino = balp.ubicacionBALP.direccion;
                let idDonante = donante.id;
                let fecha = traslado.fechaVencimientoProductos;
                filas.push([
                  origen,
                  destino,
                  idDonante,
                  new Date(fecha),
                  traslado.descripcion,
                  donante,
                  traslado,
                  new Date(traslado.fechaVencimientoInvitacion)
                ]) //Fin push    
                elementos --;
                if (elementos == 0){
                  filas.sort((a,b)=>{return new Date(a[3]).getTime() - new Date(b[3]).getTime()});
                }
              }) //Fin donante
            })//Fin donacion
          } else {
            //Caso de envio
            this.envioApi.findById(traslado.idEnvioTrasladadoAUnBeneficiario, { include: { "beneficiario": "ubicacion" } }).subscribe((envio: EnvioParaBeneficiario) => {
              let origen = balp.ubicacionBALP.direccion;
              let destino = envio.beneficiario.ubicacion.direccion;
              let idBeneficiario = envio.beneficiario.id;
              let fecha = traslado.fechaVencimientoProductos;
              let descripcion = traslado.descripcion;
              filas.push([
                origen,
                destino,
                idBeneficiario,
                new Date(fecha),
                descripcion,
                envio.beneficiario,
                traslado,
                new Date(traslado.fechaVencimientoInvitacion)
              ]) //Fin push
              elementos --;
              if (elementos == 0){
                filas.sort((a,b)=>{return new Date(a[3]).getTime() - new Date(b[3]).getTime()});
              }
            }); //Fin envio

          } //Fin if

        } // Fin For

      }); //Fin find()

      resolve(filas)
    }); //promise
  }//getAllTrasladosSinVoluntario
}//Class