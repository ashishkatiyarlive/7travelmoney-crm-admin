import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'user',
    },
    strict: true,
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    default: null,
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    default: null,
  })
  phone?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'date',
    default: null,
  })
  created_at?: string;

  @property({
    type: 'date',
    default: null,
  })
  updated_at?: string;

  @property({
    type: 'string',
    default: null,
  })
  city?: string;

  @property({
    type: 'string',
    default: null,
  })
  state?: string;

  @property({
    type: 'string',
    default: null,
  })
  address?: string;

  // @property({
  //   type: 'string',
  //   default: null,
  // })
  // permissions?: string[];
  @property.array(String)
  permissions: String[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
