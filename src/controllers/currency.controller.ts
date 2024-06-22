import {authenticate} from '@loopback/authentication';
import {
  Filter,
  FilterExcludingWhere,
  repository
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
import {Currency} from '../models';
import {CurrencyRepository} from '../repositories';


export class CurrencyController {
  constructor(
    @repository(CurrencyRepository)
    public currencyRepository: CurrencyRepository,
  ) { }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.CreateCurrency]}})
  @post('/currencies')
  @response(200, {
    description: 'Currency model instance',
    content: {'application/json': {schema: getModelSchemaRef(Currency)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {
            title: 'NewCurrency',
            exclude: ['id'],
          }),
        },
      },
    })
    currency: Omit<Currency, 'id'>,
  ): Promise<Currency> {
    return this.currencyRepository.create(currency);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.GetCurrency]}})
  @get('/currencies')
  @response(200, {
    description: 'Array of Currency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Currency, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Currency) filter?: Filter<Currency>,
  ): Promise<Currency[]> {
    return this.currencyRepository.find(filter);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.GetCurrency]}})
  @get('/currencies/{id}')
  @response(200, {
    description: 'Currency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Currency, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Currency, {exclude: 'where'}) filter?: FilterExcludingWhere<Currency>
  ): Promise<Currency> {
    return this.currencyRepository.findById(id, filter);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.CreateCurrency]}})
  @patch('/currencies/{id}')
  @response(204, {
    description: 'Currency PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {partial: true}),
        },
      },
    })
    currency: Currency,
  ): Promise<void> {
    await this.currencyRepository.updateById(id, currency);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.CreateCurrency]}})
  @put('/currencies/{id}')
  @response(204, {
    description: 'Currency PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() currency: Currency,
  ): Promise<void> {
    await this.currencyRepository.replaceById(id, currency);
  }

}
