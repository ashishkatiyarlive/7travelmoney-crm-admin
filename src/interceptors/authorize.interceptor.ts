import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {
  Getter,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
  globalInterceptor,
  inject,
} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {intersection} from 'lodash';
import {MyUserProfile} from '../types';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'authorize'}})
export class AuthorizeInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata,

    // dependency inject
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
  ) { }

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    // eslint-disable-next-line no-useless-catch
    try {
      // Add pre-invocation logic here

      // console.log('Log from authorize global interceptor')
      // console.log(this.metadata);

      // if you not provide options in your @authenticate decorator
      if (!this.metadata) return next();

      const requriedPermissions: any = this.metadata;
      const user = await this.getCurrentUser();
      const results = intersection(
        user.permissions,
        requriedPermissions[0].options?.required,
      ).length;
      if (
        requriedPermissions[0].options?.required !== undefined &&
        results !== requriedPermissions[0].options?.required.length
      ) {
        throw new HttpErrors.Forbidden('INVALID ACCESS');
      }

      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
