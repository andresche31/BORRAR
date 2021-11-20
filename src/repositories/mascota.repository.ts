import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, ConsultaVeterinaria, PagoPLanes, VisitaDomicilio, Empleado} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';
import {PagoPLanesRepository} from './pago-p-lanes.repository';
import {VisitaDomicilioRepository} from './visita-domicilio.repository';
import {EmpleadoRepository} from './empleado.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly consultaVeterinarias: HasManyRepositoryFactory<ConsultaVeterinaria, typeof Mascota.prototype.id>;

  public readonly pagoPLanes: HasManyRepositoryFactory<PagoPLanes, typeof Mascota.prototype.id>;

  public readonly visitaDomicilios: HasManyRepositoryFactory<VisitaDomicilio, typeof Mascota.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>, @repository.getter('PagoPLanesRepository') protected pagoPLanesRepositoryGetter: Getter<PagoPLanesRepository>, @repository.getter('VisitaDomicilioRepository') protected visitaDomicilioRepositoryGetter: Getter<VisitaDomicilioRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Mascota, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.visitaDomicilios = this.createHasManyRepositoryFactoryFor('visitaDomicilios', visitaDomicilioRepositoryGetter,);
    this.registerInclusionResolver('visitaDomicilios', this.visitaDomicilios.inclusionResolver);
    this.pagoPLanes = this.createHasManyRepositoryFactoryFor('pagoPLanes', pagoPLanesRepositoryGetter,);
    this.registerInclusionResolver('pagoPLanes', this.pagoPLanes.inclusionResolver);
    this.consultaVeterinarias = this.createHasManyRepositoryFactoryFor('consultaVeterinarias', consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaVeterinarias', this.consultaVeterinarias.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
