/* tslint:disable */
import {
  Volumen,
  Traslado,
  Donante,
  DescripcionGeneral,
  DescripcionDetallada
} from '../index';

declare var Object: any;
export interface DonacionInterface {
  "fechaRegistro": Date;
  "numero": number;
  "estado": string;
  "tipoDescripcion"?: string;
  "filename"?: string;
  "id"?: any;
  "idDonante"?: any;
  "idEnvio"?: any;
  volumen?: Volumen;
  traslado?: Traslado;
  donante?: Donante;
  descripcionGeneral?: DescripcionGeneral;
  descripcionDetallada?: DescripcionDetallada;
}

export class Donacion implements DonacionInterface {
  "fechaRegistro": Date;
  "numero": number;
  "estado": string;
  "tipoDescripcion": string;
  "filename": string;
  "id": any;
  "idDonante": any;
  "idEnvio": any;
  volumen: Volumen;
  traslado: Traslado;
  donante: Donante;
  descripcionGeneral: DescripcionGeneral;
  descripcionDetallada: DescripcionDetallada;
  constructor(data?: DonacionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Donacion`.
   */
  public static getModelName() {
    return "Donacion";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Donacion for dynamic purposes.
  **/
  public static factory(data: DonacionInterface): Donacion{
    return new Donacion(data);
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
      name: 'Donacion',
      plural: 'donaciones',
      path: 'donaciones',
      idName: 'id',
      properties: {
        "fechaRegistro": {
          name: 'fechaRegistro',
          type: 'Date',
          default: new Date(0)
        },
        "numero": {
          name: 'numero',
          type: 'number'
        },
        "estado": {
          name: 'estado',
          type: 'string'
        },
        "tipoDescripcion": {
          name: 'tipoDescripcion',
          type: 'string'
        },
        "filename": {
          name: 'filename',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "idDonante": {
          name: 'idDonante',
          type: 'any'
        },
        "idEnvio": {
          name: 'idEnvio',
          type: 'any'
        },
      },
      relations: {
        volumen: {
          name: 'volumen',
          type: 'Volumen',
          model: 'Volumen',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'idDonacion'
        },
        traslado: {
          name: 'traslado',
          type: 'Traslado',
          model: 'Traslado',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'idDonacionTrasladadaAlBanco'
        },
        donante: {
          name: 'donante',
          type: 'Donante',
          model: 'Donante',
          relationType: 'belongsTo',
                  keyFrom: 'idDonante',
          keyTo: 'id'
        },
        descripcionGeneral: {
          name: 'descripcionGeneral',
          type: 'DescripcionGeneral',
          model: 'DescripcionGeneral',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'idDonacion'
        },
        descripcionDetallada: {
          name: 'descripcionDetallada',
          type: 'DescripcionDetallada',
          model: 'DescripcionDetallada',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'idDonacion'
        },
      }
    }
  }
}
