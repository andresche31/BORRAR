import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Empleado} from './empleado.model';

@model()
export class VisitaDomicilio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  horaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  horaFin: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesVisita: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<VisitaDomicilio>) {
    super(data);
  }
}

export interface VisitaDomicilioRelations {
  // describe navigational properties here
}

export type VisitaDomicilioWithRelations = VisitaDomicilio & VisitaDomicilioRelations;
