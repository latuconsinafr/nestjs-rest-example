import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '../../../common/exceptions/forbidden.exception';
import { UserRole } from '../../users/enums/user-role.enum';
import { ROLES_KEY } from '../constants';

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
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user || !request.user.roles) {
      return false;
    }

    if (!requiredRoles.some((role) => request.user.roles.includes(role))) {
      throw new ForbiddenException({ message: 'Forbidden' });
    }

    return true;
  }
}
