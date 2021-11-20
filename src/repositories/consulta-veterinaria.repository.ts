import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ConsultaVeterinaria, ConsultaVeterinariaRelations, ProveedorContratista, Mascota} from '../models';
import {ProveedorContratistaRepository} from './proveedor-contratista.repository';
import {MascotaRepository} from './mascota.repository';

export class ConsultaVeterinariaRepository extends DefaultCrudRepository<
  ConsultaVeterinaria,
  typeof ConsultaVeterinaria.prototype.id,
  ConsultaVeterinariaRelations
> {

  public readonly proveedorContratista: BelongsToAccessor<ProveedorContratista, typeof ConsultaVeterinaria.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof ConsultaVeterinaria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorContratistaRepository') protected proveedorContratistaRepositoryGetter: Getter<ProveedorContratistaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(ConsultaVeterinaria, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.proveedorContratista = this.createBelongsToAccessorFor('proveedorContratista', proveedorContratistaRepositoryGetter,);
    this.registerInclusionResolver('proveedorContratista', this.proveedorContratista.inclusionResolver);
  }
}
