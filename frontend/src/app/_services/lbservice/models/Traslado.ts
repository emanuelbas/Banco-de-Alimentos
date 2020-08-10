/* tslint:disable */

declare var Object: any;
export interface TrasladoInterface {
  "fechaAsignacion"?: Date;
  "fechaEstimada": Date;
  "fechaVencimientoProductos": Date;
  "fechaFin"?: Date;
  "estado"?: string;
  "tipo"?: string;
  "volumenTotal"?: number;
  "puntaje"?: number;
  "distancia"?: number;
  "descripcion"?: string;
  "peso"?: number;
  "fechaVencimientoInvitacion": Date;
  "id"?: any;
  "voluntarioId"?: any;
  "idDonacionTrasladadaAlBanco"?: any;
  "idEnvioTrasladadoAUnBeneficiario"?: any;
}

export class Traslado implements TrasladoInterface {
  "fechaAsignacion": Date;
  "fechaEstimada": Date;
  "fechaVencimientoProductos": Date;
  "fechaFin": Date;
  "estado": string;
  "tipo": string;
  "volumenTotal": number;
  "puntaje": number;
  "distancia": number;
  "descripcion": string;
  "peso": number;
  "fechaVencimientoInvitacion": Date;
  "id": any;
  "voluntarioId": any;
  "idDonacionTrasladadaAlBanco": any;
  "idEnvioTrasladadoAUnBeneficiario": any;
  constructor(data?: TrasladoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Traslado`.
   */
  public static getModelName() {
    return "Traslado";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Traslado for dynamic purposes.
  **/
  public static factory(data: TrasladoInterface): Traslado{
    return new Traslado(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Traslado',
      plural: 'Traslados',
      path: 'Traslados',
      idName: 'id',
      properties: {
        "fechaAsignacion": {
          name: 'fechaAsignacion',
          type: 'Date'
        },
        "fechaEstimada": {
          name: 'fechaEstimada',
          type: 'Date'
        },
        "fechaVencimientoProductos": {
          name: 'fechaVencimientoProductos',
          type: 'Date',
          default: new Date('December 17, 2003 03:24:00')
        },
        "fechaFin": {
          name: 'fechaFin',
          type: 'Date'
        },
        "estado": {
          name: 'estado',
          type: 'string',
          default: 'pendiente de retiro'
        },
        "tipo": {
          name: 'tipo',
          type: 'string'
        },
        "volumenTotal": {
          name: 'volumenTotal',
          type: 'number'
        },
        "puntaje": {
          name: 'puntaje',
          type: 'number'
        },
        "distancia": {
          name: 'distancia',
          type: 'number'
        },
        "descripcion": {
          name: 'descripcion',
          type: 'string'
        },
        "peso": {
          name: 'peso',
          type: 'number'
        },
        "fechaVencimientoInvitacion": {
          name: 'fechaVencimientoInvitacion',
          type: 'Date',
          default: new Date('December 17, 2003 03:24:00')
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "voluntarioId": {
          name: 'voluntarioId',
          type: 'any'
        },
        "idDonacionTrasladadaAlBanco": {
          name: 'idDonacionTrasladadaAlBanco',
          type: 'any'
        },
        "idEnvioTrasladadoAUnBeneficiario": {
          name: 'idEnvioTrasladadoAUnBeneficiario',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
