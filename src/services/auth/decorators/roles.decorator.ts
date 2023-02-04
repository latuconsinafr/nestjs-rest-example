import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/enums/user-role.enum';
import { ROLES_KEY } from '../constants';

/**
 * Decorator that set a specified route path or controller or any below method to be authorized by specified role(s).
 *
 * @returns The truth is public key
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
