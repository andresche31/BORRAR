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
  VisitaDomicilio,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaVisitaDomicilioController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Array of Mascota has many VisitaDomicilio',
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
    return this.mascotaRepository.visitaDomicilios(id).find(filter);
  }

  @post('/mascotas/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaDomicilio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaDomicilio, {
            title: 'NewVisitaDomicilioInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) visitaDomicilio: Omit<VisitaDomicilio, 'id'>,
  ): Promise<VisitaDomicilio> {
    return this.mascotaRepository.visitaDomicilios(id).create(visitaDomicilio);
  }

  @patch('/mascotas/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Mascota.VisitaDomicilio PATCH success count',
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
    return this.mascotaRepository.visitaDomicilios(id).patch(visitaDomicilio, where);
  }

  @del('/mascotas/{id}/visita-domicilios', {
    responses: {
      '200': {
        description: 'Mascota.VisitaDomicilio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaDomicilio)) where?: Where<VisitaDomicilio>,
  ): Promise<Count> {
    return this.mascotaRepository.visitaDomicilios(id).delete(where);
  }
}
