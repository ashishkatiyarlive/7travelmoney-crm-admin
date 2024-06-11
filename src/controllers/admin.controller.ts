import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import _ from 'lodash';
import {PermissionKeys} from '../authorization/permission-keys';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password';
import {validateCredentials} from '../services/validator.service';

export class AdminController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) { }

  @post('/admin', {
    responses: {
      '200': {
        description: 'Admin',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async createAdmin(@requestBody() admin: User) {
    validateCredentials(_.pick(admin, ['email', 'password']));
    admin.permissions = [
      PermissionKeys.CreateJob,
      PermissionKeys.UpdateJob,
      PermissionKeys.DeleteJob,
    ];

    admin.password = await this.hasher.hashPassword(admin.password);

    const savedAdmin = await this.userRepository.create(admin);
    //delete savedAdmin.password;
    return savedAdmin;
  }
}
