import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Currency} from './currency.model';
import {User} from './user.model';

@model({
  settings: {
    postgresql: {
      table: 'order',
    },
    strict: true,
  },
})
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  rate: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'date',
    default: null,
  })
  booking_date?: string;

  @property({
    type: 'date',
    default: null,
  })
  expiry_date?: string;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'number',
    required: true,
  })
  total_amount: number;

  @property({
    type: 'date',
    default: null,
  })
  updated_at?: string;

  @belongsTo(() => User, {name: 'user'})
  user_id: number;

  @belongsTo(() => Currency, {name: 'currencies'})
  currency_id: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
