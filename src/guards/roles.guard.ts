import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../common/enums/user-role.enum';

/**
 * Defines guard based on user role.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * The constructor.
   *
   * @param reflector The reflector
   */
  constructor(private reflector: Reflector) {}

  /**
   * {@inheritDoc CanActivate.canActivate}
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    // const request = context.switchToHttp().getRequest();
    // const user = request.user;

    //! Simulate user roles
    const user = {
      roles: [UserRole.ADMIN],
    };

    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(roles: string[], userRoles: string[]): boolean {
    return userRoles.some((role) => roles.includes(role));
  }
}
