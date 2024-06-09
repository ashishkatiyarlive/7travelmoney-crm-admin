import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TravelmoneycrmDataSource} from '../datasources';
import {Order, OrderRelations} from '../models';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  constructor(
    @inject('datasources.travelmoneycrm') dataSource: TravelmoneycrmDataSource,
  ) {
    super(Order, dataSource);
  }
}
