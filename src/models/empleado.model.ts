import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {VisitaDomicilio} from './visita-domicilio.model';
import {Mascota} from './mascota.model';
import {Empleado} from './empleado.model';

@model()
export class Empleado extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

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

  @property({
    type: 'date',
    required: true,
  })
  fechaVinculacion: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'number',
    required: true,
  })
  comision: number;

  @property({
    type: 'string',
    required: true,
  })
  nivelAcceso: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @hasMany(() => VisitaDomicilio)
  visitaDomicilios: VisitaDomicilio[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
