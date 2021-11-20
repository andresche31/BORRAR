import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProveedorContratista, ProveedorContratistaRelations, Producto, ConsultaVeterinaria} from '../models';
import {ProductoRepository} from './producto.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';

export class ProveedorContratistaRepository extends DefaultCrudRepository<
  ProveedorContratista,
  typeof ProveedorContratista.prototype.id,
  ProveedorContratistaRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof ProveedorContratista.prototype.id>;

  public readonly consultaVeterinarias: HasManyRepositoryFactory<ConsultaVeterinaria, typeof ProveedorContratista.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>,
  ) {
    super(ProveedorContratista, dataSource);
    this.consultaVeterinarias = this.createHasManyRepositoryFactoryFor('consultaVeterinarias', consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaVeterinarias', this.consultaVeterinarias.inclusionResolver);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
