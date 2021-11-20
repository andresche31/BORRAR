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
  Empleado,
  VisitaDomicilio,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoVisitaDomicilioController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Array of Empleado has many VisitaDomicilio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VisitaDomicilio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VisitaDomicilio>,
  ): Promise<VisitaDomicilio[]> {
    return this.empleadoRepository.visitaDomicilios(id).find(filter);
  }

  @post('/empleados/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaDomicilio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomicilio, {
            title: 'NewVisitaDomicilioInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) visitaDomicilio: Omit<VisitaDomicilio, 'id'>,
  ): Promise<VisitaDomicilio> {
    return this.empleadoRepository.visitaDomicilios(id).create(visitaDomicilio);
  }

  @patch('/empleados/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Empleado.VisitaDomicilio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomicilio, {partial: true}),
        },
      },
    })
    visitaDomicilio: Partial<VisitaDomicilio>,
    @param.query.object('where', getWhereSchemaFor(VisitaDomicilio)) where?: Where<VisitaDomicilio>,
  ): Promise<Count> {
    return this.empleadoRepository.visitaDomicilios(id).patch(visitaDomicilio, where);
  }

  @del('/empleados/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Empleado.VisitaDomicilio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaDomicilio)) where?: Where<VisitaDomicilio>,
  ): Promise<Count> {
    return this.empleadoRepository.visitaDomicilios(id).delete(where);
  }
}
