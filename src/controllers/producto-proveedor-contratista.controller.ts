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
  Producto,
  ProveedorContratista,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProveedorContratistaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'Array of Producto has many ProveedorContratista',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProveedorContratista)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProveedorContratista>,
  ): Promise<ProveedorContratista[]> {
    return this.productoRepository.proveedorContratistas(id).find(filter);
  }

  @post('/productos/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProveedorContratista)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorContratista, {
            title: 'NewProveedorContratistaInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) proveedorContratista: Omit<ProveedorContratista, 'id'>,
  ): Promise<ProveedorContratista> {
    return this.productoRepository.proveedorContratistas(id).create(proveedorContratista);
  }

  @patch('/productos/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'Producto.ProveedorContratista PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProveedorContratista, {partial: true}),
        },
      },
    })
    proveedorContratista: Partial<ProveedorContratista>,
    @param.query.object('where', getWhereSchemaFor(ProveedorContratista)) where?: Where<ProveedorContratista>,
  ): Promise<Count> {
    return this.productoRepository.proveedorContratistas(id).patch(proveedorContratista, where);
  }

  @del('/productos/{id}/proveedor-contratistas', {
    responses: {
      '200': {
        description: 'Producto.ProveedorContratista DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProveedorContratista)) where?: Where<ProveedorContratista>,
  ): Promise<Count> {
    return this.productoRepository.proveedorContratistas(id).delete(where);
  }
}
