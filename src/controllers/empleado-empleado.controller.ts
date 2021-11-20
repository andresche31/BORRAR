import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Empleado,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoEmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Empleado> {
    return this.empleadoRepository.empleado(id);
  }
}
