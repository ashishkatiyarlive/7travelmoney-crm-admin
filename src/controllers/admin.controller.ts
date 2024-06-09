import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PasswordHasherBindings} from '../keys';
import {UserRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password';

export class AdminController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) { }

  // @post('/admin', {
  //   responses: {
  //     '200': {
  //       description: 'Admin',
  //       content: {'application/json': {schema: getModelSchemaRef(User)}},
  //     },
  //   },
  // })
  // async createAdmin(@requestBody() admin: User) {
  //   validateCredentials(_.pick(admin, ['email', 'password']));
  //   admin.permissions = [
  //     PermissionKeys.CreateJob,
  //     PermissionKeys.UpdateJob,
  //     PermissionKeys.DeleteJob,
  //   ];

  //   admin.password = await this.hasher.hashPassword(admin.password);

  //   const savedAdmin = await this.userRepository.create(admin);
  //   //delete savedAdmin.password;
  //   return savedAdmin;
  // }
}
