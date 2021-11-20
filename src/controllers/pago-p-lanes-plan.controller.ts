import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PagoPLanes,
  Plan,
} from '../models';
import {PagoPLanesRepository} from '../repositories';

export class PagoPLanesPlanController {
  constructor(
    @repository(PagoPLanesRepository)
    public pagoPLanesRepository: PagoPLanesRepository,
  ) { }

  @get('/pago-p-lanes/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to PagoPLanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof PagoPLanes.prototype.id,
  ): Promise<Plan> {
    return this.pagoPLanesRepository.plan(id);
  }
}
