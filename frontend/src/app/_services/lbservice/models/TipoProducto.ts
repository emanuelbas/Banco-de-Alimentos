/* tslint:disable */
import {
  Categoria
} from '../index';

declare var Object: any;
export interface TipoProductoInterface {
  "nombre": string;
  "codigoBarra"?: string;
  "peso"?: number;
  "id"?: any;
  "categoriaId"?: any;
  categoria?: Categoria;
}

export class TipoProducto implements TipoProductoInterface {
  "nombre": string;
  "codigoBarra": string;
  "peso": number;
  "id": any;
  "categoriaId": any;
  categoria: Categoria;
  constructor(data?: TipoProductoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TipoProducto`.
   */
  public static getModelName() {
    return "TipoProducto";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TipoProducto for dynamic purposes.
  **/
  public static factory(data: TipoProductoInterface): TipoProducto{
    return new TipoProducto(data);
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
      name: 'TipoProducto',
      plural: 'TipoProductos',
      path: 'TipoProductos',
      idName: 'id',
      properties: {
        "nombre": {
          name: 'nombre',
          type: 'string'
        },
        "codigoBarra": {
          name: 'codigoBarra',
          type: 'string'
        },
        "peso": {
          name: 'peso',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "categoriaId": {
          name: 'categoriaId',
          type: 'any'
        },
      },
      relations: {
        categoria: {
          name: 'categoria',
          type: 'Categoria',
          model: 'Categoria',
          relationType: 'belongsTo',
                  keyFrom: 'categoriaId',
          keyTo: 'id'
        },
      }
    }
  }
}
