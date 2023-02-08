import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { UserIdParam } from '../../params/users/user-id.param';
import { CreateUserRequest } from './create-user-request.dto';

/**
 * Defines the DTO that carries data to update a user's password.
 *
 * @usageNotes
 * This DTO intersect {@link UserIdParam} with {@link CreateUserRequest} with picked `password` attribute.
 */
export class UpdateUserPasswordRequest extends IntersectionType(
  UserIdParam,
  PickType(CreateUserRequest, ['password']),
) {}
