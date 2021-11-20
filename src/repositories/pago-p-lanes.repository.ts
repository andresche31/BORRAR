import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagoPLanes, PagoPLanesRelations, Mascota, Plan} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PlanRepository} from './plan.repository';

export class PagoPLanesRepository extends DefaultCrudRepository<
  PagoPLanes,
  typeof PagoPLanes.prototype.id,
  PagoPLanesRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagoPLanes.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof PagoPLanes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(PagoPLanes, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
