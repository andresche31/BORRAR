import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, DetallePedido, ProveedorContratista} from '../models';
import {DetallePedidoRepository} from './detalle-pedido.repository';
import {ProveedorContratistaRepository} from './proveedor-contratista.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detallePedidos: HasManyRepositoryFactory<DetallePedido, typeof Producto.prototype.id>;

  public readonly proveedorContratistas: HasManyRepositoryFactory<ProveedorContratista, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetallePedidoRepository') protected detallePedidoRepositoryGetter: Getter<DetallePedidoRepository>, @repository.getter('ProveedorContratistaRepository') protected proveedorContratistaRepositoryGetter: Getter<ProveedorContratistaRepository>,
  ) {
    super(Producto, dataSource);
    this.proveedorContratistas = this.createHasManyRepositoryFactoryFor('proveedorContratistas', proveedorContratistaRepositoryGetter,);
    this.registerInclusionResolver('proveedorContratistas', this.proveedorContratistas.inclusionResolver);
    this.detallePedidos = this.createHasManyRepositoryFactoryFor('detallePedidos', detallePedidoRepositoryGetter,);
    this.registerInclusionResolver('detallePedidos', this.detallePedidos.inclusionResolver);
  }
}
