import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, VisitaDomicilio, Mascota} from '../models';
import {VisitaDomicilioRepository} from './visita-domicilio.repository';
import {MascotaRepository} from './mascota.repository';
import {EmpleadoRepository} from './empleado.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly visitaDomicilios: HasManyRepositoryFactory<VisitaDomicilio, typeof Empleado.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Empleado.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Empleado.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VisitaDomicilioRepository') protected visitaDomicilioRepositoryGetter: Getter<VisitaDomicilioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Empleado, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.visitaDomicilios = this.createHasManyRepositoryFactoryFor('visitaDomicilios', visitaDomicilioRepositoryGetter,);
    this.registerInclusionResolver('visitaDomicilios', this.visitaDomicilios.inclusionResolver);
  }
}
