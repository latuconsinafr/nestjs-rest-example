import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';

/**
 * Defines auth guard that matches the strategy named `jwt`.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   *
   * @param reflector The reflector to access the route's custom metadata
   */
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: 'Unauthorized' });
    }

    return user;
  }
}
