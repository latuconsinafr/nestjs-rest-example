import { IntersectionType } from '@nestjs/mapped-types';
import { UserIdParam } from '../params/user-id.param';
import { CreateUserRequest } from './create-user-request.dto';

/**
 * Defines the DTO that carries data to update a user.
 *
 * @usageNotes
 * This DTO intersect {@link UserIdParam} with {@link CreateUserRequest}.
 */
export class UpdateUserRequest extends IntersectionType(
  UserIdParam,
  CreateUserRequest,
) {}
