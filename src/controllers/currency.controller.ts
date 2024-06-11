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
import {Currency} from '../models';
import {CurrencyRepository} from '../repositories';

export class CurrencyController {
  constructor(
    @repository(CurrencyRepository)
    public currencyRepository: CurrencyRepository,
  ) { }

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
