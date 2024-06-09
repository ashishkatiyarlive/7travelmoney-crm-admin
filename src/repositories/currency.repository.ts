import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TravelmoneycrmDataSource} from '../datasources';
import {Currency, CurrencyRelations} from '../models';

export class CurrencyRepository extends DefaultCrudRepository<
  Currency,
  typeof Currency.prototype.id,
  CurrencyRelations
> {
  constructor(
    @inject('datasources.travelmoneycrm') dataSource: TravelmoneycrmDataSource,
  ) {
    super(Currency, dataSource);
  }
}
