import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'travelmoneycrm',
  connector: 'postgresql',
  url: 'postgres://postgres:Nxone@502824@89.116.32.199/7travel-money-crm',
  host: 'localhost',
  port: 5432,
  user: 'postgress',
  password: 'Nxone@502824',
  database: '7travel-money-crm'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TravelmoneycrmDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'travelmoneycrm';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.travelmoneycrm', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
