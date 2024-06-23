import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {PermissionKeys} from '../authorization/permission-keys';
import {Order} from '../models';
import {OrderRepository} from '../repositories';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.Order]}})
  @post('/orders')
  @response(200, {
    description: 'Order model instance',
    content: {'application/json': {schema: getModelSchemaRef(Order)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.orderRepository.create(order);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.Order]}})
  @get('/orders/count')
  @response(200, {
    description: 'Order model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Order) where?: Where<Order>,
  ): Promise<Count> {
    return this.orderRepository.count(where);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.Order]}})
  @get('/orders')
  @response(200, {
    description: 'Array of Order model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Order, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Order) filter?: Filter<Order>,
  ): Promise<Order[]> {
    filter = {
      "offset": 0,
      "limit": 100,
      "skip": 0,
      "order": ["booking_date DESC"],
      "include": [
        {
          "relation": "user"
        },
        {
          "relation": "currencies"
        }
      ]
    }
    return this.orderRepository.find(filter, {include: ['user', 'currencies']});
    // {
    //   "offset": 0,
    //   "limit": 100,
    //   "skip": 0,
    //   "order": "id",
    //   "where": {
    //     "status": 1
    //   },
    //   "include": [
    //     {
    //       "relation": "user"
    //     },
    //  {
    //       "relation": "currencies"
    //     }
    //   ]
    // }
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.Order]}})
  @get('/orders/{id}')
  @response(200, {
    description: 'Order model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Order, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Order, {exclude: 'where'}) filter?: FilterExcludingWhere<Order>
  ): Promise<Order> {
    return this.orderRepository.findById(id, filter,
      {include: ['user', 'currencies']}
    );
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.Order]}})
  @patch('/orders/{id}')
  @response(204, {
    description: 'Order PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
  ): Promise<void> {
    await this.orderRepository.updateById(id, order);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.Order]}})
  @put('/orders/{id}')
  @response(204, {
    description: 'Order PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() order: Order,
  ): Promise<void> {
    await this.orderRepository.replaceById(id, order);
  }

}
