import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';

@model()
export class PagoPLanes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoPlan: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Plan)
  planId: string;

  constructor(data?: Partial<PagoPLanes>) {
    super(data);
  }
}

export interface PagoPLanesRelations {
  // describe navigational properties here
}

export type PagoPLanesWithRelations = PagoPLanes & PagoPLanesRelations;
