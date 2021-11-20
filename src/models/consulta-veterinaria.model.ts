import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ProveedorContratista} from './proveedor-contratista.model';
import {Mascota} from './mascota.model';

@model()
export class ConsultaVeterinaria extends Entity {
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
  fechaSolicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaConsulta: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoPago: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesConsulta: string;

  @belongsTo(() => ProveedorContratista)
  proveedorContratistaId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<ConsultaVeterinaria>) {
    super(data);
  }
}

export interface ConsultaVeterinariaRelations {
  // describe navigational properties here
}

export type ConsultaVeterinariaWithRelations = ConsultaVeterinaria & ConsultaVeterinariaRelations;
