import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ConsultaVeterinaria,
  ProveedorContratista,
} from '../models';
import {ConsultaVeterinariaRepository} from '../repositories';

export class ConsultaVeterinariaProveedorContratistaController {
  constructor(
    @repository(ConsultaVeterinariaRepository)
    public consultaVeterinariaRepository: ConsultaVeterinariaRepository,
  ) { }

  @get('/consulta-veterinarias/{id}/proveedor-contratista', {
    responses: {
      '200': {
        description: 'ProveedorContratista belonging to ConsultaVeterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProveedorContratista)},
          },
        },
      },
    },
  })
  async getProveedorContratista(
    @param.path.string('id') id: typeof ConsultaVeterinaria.prototype.id,
  ): Promise<ProveedorContratista> {
    return this.consultaVeterinariaRepository.proveedorContratista(id);
  }
}
