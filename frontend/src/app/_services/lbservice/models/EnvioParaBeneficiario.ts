/* tslint:disable */
import {
  Beneficiario,
  Volumen,
  Traslado,
  Donacion,
  Producto,
  Item
} from '../index';

declare var Object: any;
export interface EnvioParaBeneficiarioInterface {
  "tipo": string;
  "id"?: any;
  "beneficiarioId"?: any;
  beneficiario?: Beneficiario;
  volumen?: Volumen;
  traslados?: Traslado;
  donacion?: Donacion;
  productos?: Producto[];
  items?: Item[];
}

export class EnvioParaBeneficiario implements EnvioParaBeneficiarioInterface {
  "tipo": string;
  "id": any;
  "beneficiarioId": any;
  beneficiario: Beneficiario;
  volumen: Volumen;
  traslados: Traslado;
  donacion: Donacion;
  productos: Producto[];
  items: Item[];
  constructor(data?: EnvioParaBeneficiarioInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EnvioParaBeneficiario`.
   */
  public static getModelName() {
    return "EnvioParaBeneficiario";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EnvioParaBeneficiario for dynamic purposes.
  **/
  public static factory(data: EnvioParaBeneficiarioInterface): EnvioParaBeneficiario{
    return new EnvioParaBeneficiario(data);
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
      name: 'EnvioParaBeneficiario',
      plural: 'EnviosParaBeneficiario',
      path: 'EnviosParaBeneficiario',
      idName: 'id',
      properties: {
        "tipo": {
          name: 'tipo',
          type: 'string',
          default: 'a partir de stock'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "beneficiarioId": {
          name: 'beneficiarioId',
          type: 'any'
        },
      },
      relations: {
        beneficiario: {
          name: 'beneficiario',
          type: 'Beneficiario',
          model: 'Beneficiario',
          relationType: 'belongsTo',
                  keyFrom: 'beneficiarioId',
          keyTo: 'id'
        },
        volumen: {
          name: 'volumen',
          type: 'Volumen',
          model: 'Volumen',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'envioParaBeneficiarioId'
        },
        traslados: {
          name: 'traslados',
          type: 'Traslado',
          model: 'Traslado',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'idEnvioTrasladadoAUnBeneficiario'
        },
        donacion: {
          name: 'donacion',
          type: 'Donacion',
          model: 'Donacion',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'idEnvio'
        },
        productos: {
          name: 'productos',
          type: 'Producto[]',
          model: 'Producto',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'envioParaBeneficiarioId'
        },
        items: {
          name: 'items',
          type: 'Item[]',
          model: 'Item',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'envioParaBeneficiarioId'
        },
      }
    }
  }
}
