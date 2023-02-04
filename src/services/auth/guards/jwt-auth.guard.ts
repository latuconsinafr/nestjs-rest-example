import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';
import { IS_PUBLIC_KEY } from '../constants';

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

  /**
   * {@inheritDoc NestInterceptor.intercept}
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // * If there's a IS_PUBLIC_KEY metadata with value true then bypass the auth guard immediately
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
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
