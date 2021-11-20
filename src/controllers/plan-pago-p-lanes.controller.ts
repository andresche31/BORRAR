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
  Plan,
  PagoPLanes,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPagoPLanesController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Array of Plan has many PagoPLanes',
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
    return this.planRepository.pagoPLanes(id).find(filter);
  }

  @post('/plans/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagoPLanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPLanes, {
            title: 'NewPagoPLanesInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) pagoPLanes: Omit<PagoPLanes, 'id'>,
  ): Promise<PagoPLanes> {
    return this.planRepository.pagoPLanes(id).create(pagoPLanes);
  }

  @patch('/plans/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Plan.PagoPLanes PATCH success count',
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
    return this.planRepository.pagoPLanes(id).patch(pagoPLanes, where);
  }

  @del('/plans/{id}/pago-p-lanes', {
    responses: {
      '200': {
        description: 'Plan.PagoPLanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagoPLanes)) where?: Where<PagoPLanes>,
  ): Promise<Count> {
    return this.planRepository.pagoPLanes(id).delete(where);
  }
}
