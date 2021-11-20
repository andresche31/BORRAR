import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  PagoPLanes,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPagoPLanesController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Array of Mascota has many PagoPLanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PagoPLanes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PagoPLanes>,
  ): Promise<PagoPLanes[]> {
    return this.mascotaRepository.pagoPLanes(id).find(filter);
  }

  @post('/mascotas/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagoPLanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPLanes, {
            title: 'NewPagoPLanesInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) pagoPLanes: Omit<PagoPLanes, 'id'>,
  ): Promise<PagoPLanes> {
    return this.mascotaRepository.pagoPLanes(id).create(pagoPLanes);
  }

  @patch('/mascotas/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Mascota.PagoPLanes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPLanes, {partial: true}),
        },
      },
    })
    pagoPLanes: Partial<PagoPLanes>,
    @param.query.object('where', getWhereSchemaFor(PagoPLanes)) where?: Where<PagoPLanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagoPLanes(id).patch(pagoPLanes, where);
  }

  @del('/mascotas/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Mascota.PagoPLanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagoPLanes)) where?: Where<PagoPLanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagoPLanes(id).delete(where);
  }
}
