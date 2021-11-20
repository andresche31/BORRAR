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
  Mascota,
} from '../models';
import {PagoPLanesRepository} from '../repositories';

export class PagoPLanesMascotaController {
  constructor(
    @repository(PagoPLanesRepository)
    public pagoPLanesRepository: PagoPLanesRepository,
  ) { }

  @get('/pago-p-lanes/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to PagoPLanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof PagoPLanes.prototype.id,
  ): Promise<Mascota> {
    return this.pagoPLanesRepository.mascota(id);
  }
}
