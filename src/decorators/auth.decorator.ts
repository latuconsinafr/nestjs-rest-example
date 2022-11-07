import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '../common/enums/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';

/**
 * Custom auth decorator based on user roles.
 *
 * @param roles Array of user roles to bind
 * @returns The function
 */
export function Auth(
  ...roles: UserRole[]
): // eslint-disable-next-line @typescript-eslint/ban-types
<TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
