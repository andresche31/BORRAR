import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VisitaDomicilio, VisitaDomicilioRelations, Mascota, Empleado} from '../models';
import {MascotaRepository} from './mascota.repository';
import {EmpleadoRepository} from './empleado.repository';

export class VisitaDomicilioRepository extends DefaultCrudRepository<
  VisitaDomicilio,
  typeof VisitaDomicilio.prototype.id,
  VisitaDomicilioRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof VisitaDomicilio.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof VisitaDomicilio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(VisitaDomicilio, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
