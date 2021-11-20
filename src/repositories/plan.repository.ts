import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, PagoPLanes} from '../models';
import {PagoPLanesRepository} from './pago-p-lanes.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly pagoPLanes: HasManyRepositoryFactory<PagoPLanes, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagoPLanesRepository') protected pagoPLanesRepositoryGetter: Getter<PagoPLanesRepository>,
  ) {
    super(Plan, dataSource);
    this.pagoPLanes = this.createHasManyRepositoryFactoryFor('pagoPLanes', pagoPLanesRepositoryGetter,);
    this.registerInclusionResolver('pagoPLanes', this.pagoPLanes.inclusionResolver);
  }
}
