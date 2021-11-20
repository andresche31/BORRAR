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
  ProveedorContratista,
  ConsultaVeterinaria,
} from '../models';
import {ProveedorContratistaRepository} from '../repositories';

export class ProveedorContratistaConsultaVeterinariaController {
  constructor(
    @repository(ProveedorContratistaRepository) protected proveedorContratistaRepository: ProveedorContratistaRepository,
  ) { }

  @get('/proveedor-contratistas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Array of ProveedorContratista has many ConsultaVeterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ConsultaVeterinaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ConsultaVeterinaria>,
  ): Promise<ConsultaVeterinaria[]> {
    return this.proveedorContratistaRepository.consultaVeterinarias(id).find(filter);
  }

  @post('/proveedor-contratistas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'ProveedorContratista model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultaVeterinaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProveedorContratista.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {
            title: 'NewConsultaVeterinariaInProveedorContratista',
            exclude: ['id'],
            optional: ['proveedorContratistaId']
          }),
        },
      },
    }) consultaVeterinaria: Omit<ConsultaVeterinaria, 'id'>,
  ): Promise<ConsultaVeterinaria> {
    return this.proveedorContratistaRepository.consultaVeterinarias(id).create(consultaVeterinaria);
  }

  @patch('/proveedor-contratistas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'ProveedorContratista.ConsultaVeterinaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {partial: true}),
        },
      },
    })
    consultaVeterinaria: Partial<ConsultaVeterinaria>,
    @param.query.object('where', getWhereSchemaFor(ConsultaVeterinaria)) where?: Where<ConsultaVeterinaria>,
  ): Promise<Count> {
    return this.proveedorContratistaRepository.consultaVeterinarias(id).patch(consultaVeterinaria, where);
  }

  @del('/proveedor-contratistas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'ProveedorContratista.ConsultaVeterinaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsultaVeterinaria)) where?: Where<ConsultaVeterinaria>,
  ): Promise<Count> {
    return this.proveedorContratistaRepository.consultaVeterinarias(id).delete(where);
  }
}
