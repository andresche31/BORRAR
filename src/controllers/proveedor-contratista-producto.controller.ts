import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProveedorContratista,
  Producto,
} from '../models';
import {ProveedorContratistaRepository} from '../repositories';

export class ProveedorContratistaProductoController {
  constructor(
    @repository(ProveedorContratistaRepository)
    public proveedorContratistaRepository: ProveedorContratistaRepository,
  ) { }

  @get('/proveedor-contratistas/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to ProveedorContratista',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof ProveedorContratista.prototype.id,
  ): Promise<Producto> {
    return this.proveedorContratistaRepository.producto(id);
  }
}
