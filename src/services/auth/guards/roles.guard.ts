import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants';

/**
 * Class defining function that implement guard based on {@link UserRole}.
 *
 * @see [Guards](https://docs.nestjs.com/guards)
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * The constructor.
   *
   * @param reflector The reflector to access the route's custom metadata
   */
  constructor(private reflector: Reflector) {}

  /**
   * {@inheritDoc CanActivate.canActivate}
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles || roles.length == 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user || !request.user.roles) {
      return false;
    }

    return this.matchRoles(roles, request.user.roles);
  }

  /**
   * Function that matches incoming roles with user roles.
   *
   * @param roles The roles to guard
   * @param userRoles The user roles
   *
   * @returns The flag indicates whether a given user has a role that match,
   * return true if user has matching role(s), otherwise false.
   */
  private matchRoles(roles: string[], userRoles: string[]): boolean {
    return userRoles.some((role) => roles.includes(role));
  }
}
