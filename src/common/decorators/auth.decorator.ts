import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';

/**
 * Decorator that combine multiple decorators to apply authentication,
 * to the scope of controller or method, depending on its context.
 *
 * @example
 * `Auth(UserRole.SuperAdmin)`
 *
 * @usageNotes
 * This decorator applies:
 * - `@SetMetadata` decorator
 * - `@UseGuards` decorator
 *
 * @param roles An array of user roles to bind
 */
export function Auth(...roles: UserRole[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
