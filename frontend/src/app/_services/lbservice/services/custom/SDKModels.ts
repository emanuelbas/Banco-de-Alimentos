/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Donante } from '../../models/Donante';
import { PersonaDeContacto } from '../../models/PersonaDeContacto';
import { Ubicacion } from '../../models/Ubicacion';
import { Beneficiario } from '../../models/Beneficiario';
import { Voluntario } from '../../models/Voluntario';
import { Insignia } from '../../models/Insignia';
import { Vehiculo } from '../../models/Vehiculo';
import { Traslado } from '../../models/Traslado';
import { Volumen } from '../../models/Volumen';
import { Donacion } from '../../models/Donacion';
import { EnvioParaBeneficiario } from '../../models/EnvioParaBeneficiario';
import { DescripcionGeneral } from '../../models/DescripcionGeneral';
import { DescripcionDetallada } from '../../models/DescripcionDetallada';
import { Producto } from '../../models/Producto';
import { TipoProducto } from '../../models/TipoProducto';
import { Categoria } from '../../models/Categoria';
import { Item } from '../../models/Item';
import { TipoInsignia } from '../../models/TipoInsignia';
import { Container } from '../../models/Container';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Donante: Donante,
    PersonaDeContacto: PersonaDeContacto,
    Ubicacion: Ubicacion,
    Beneficiario: Beneficiario,
    Voluntario: Voluntario,
    Insignia: Insignia,
    Vehiculo: Vehiculo,
    Traslado: Traslado,
    Volumen: Volumen,
    Donacion: Donacion,
    EnvioParaBeneficiario: EnvioParaBeneficiario,
    DescripcionGeneral: DescripcionGeneral,
    DescripcionDetallada: DescripcionDetallada,
    Producto: Producto,
    TipoProducto: TipoProducto,
    Categoria: Categoria,
    Item: Item,
    TipoInsignia: TipoInsignia,
    Container: Container,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
