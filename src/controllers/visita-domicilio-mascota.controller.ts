import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VisitaDomicilio,
  Mascota,
} from '../models';
import {VisitaDomicilioRepository} from '../repositories';

export class VisitaDomicilioMascotaController {
  constructor(
    @repository(VisitaDomicilioRepository)
    public visitaDomicilioRepository: VisitaDomicilioRepository,
  ) { }

  @get('/visita-domicilios/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to VisitaDomicilio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof VisitaDomicilio.prototype.id,
  ): Promise<Mascota> {
    return this.visitaDomicilioRepository.mascota(id);
  }
}
