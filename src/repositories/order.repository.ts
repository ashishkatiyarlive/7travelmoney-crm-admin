import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {TravelmoneycrmDataSource} from '../datasources';
import {Currency, Order, OrderRelations, User} from '../models';
import {CurrencyRepository} from './currency.repository';
import {UserRepository} from './user.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Order.prototype.id>;

  public readonly currencies: BelongsToAccessor<Currency, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.travelmoneycrm') dataSource: TravelmoneycrmDataSource, @repository.getter('CurrencyRepository') protected currencyRepositoryGetter: Getter<CurrencyRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Order, dataSource);
    this.currencies = this.createBelongsToAccessorFor('currencies', currencyRepositoryGetter,);
    this.registerInclusionResolver('currencies', this.currencies.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
