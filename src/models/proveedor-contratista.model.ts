import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';

@model()
export class ProveedorContratista extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono1: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono2: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @belongsTo(() => Producto)
  productoId: string;

  @hasMany(() => ConsultaVeterinaria)
  consultaVeterinarias: ConsultaVeterinaria[];

  constructor(data?: Partial<ProveedorContratista>) {
    super(data);
  }
}

export interface ProveedorContratistaRelations {
  // describe navigational properties here
}

export type ProveedorContratistaWithRelations = ProveedorContratista & ProveedorContratistaRelations;
