import { IntersectionType, OmitType } from '@nestjs/mapped-types';
import { User } from '../../../entities/user.entity';
import { UserIdParam } from '../../params/users/user-id.param';
import { CreateUserRequest } from './create-user-request.dto';

/**
 * Defines the DTO that carries data to update a user.
 *
 * @usageNotes
 * This DTO intersect {@link UserIdParam} with {@link CreateUserRequest}.
 */
export class UpdateUserRequest extends IntersectionType(
  UserIdParam,
  OmitType(CreateUserRequest, ['password', 'roles', 'profile']),
) {
  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `User` entity
   */
  static toEntity(request: UpdateUserRequest): User {
    return new User(request);
  }
}
