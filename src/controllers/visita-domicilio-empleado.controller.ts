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
  Empleado,
} from '../models';
import {VisitaDomicilioRepository} from '../repositories';

export class VisitaDomicilioEmpleadoController {
  constructor(
    @repository(VisitaDomicilioRepository)
    public visitaDomicilioRepository: VisitaDomicilioRepository,
  ) { }

  @get('/visita-domicilios/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to VisitaDomicilio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof VisitaDomicilio.prototype.id,
  ): Promise<Empleado> {
    return this.visitaDomicilioRepository.empleado(id);
  }
}
