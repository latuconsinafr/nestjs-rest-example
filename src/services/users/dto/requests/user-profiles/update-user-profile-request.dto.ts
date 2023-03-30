import { IntersectionType } from '@nestjs/swagger';
import { UserProfile } from '../../../entities/user-profile.entity';
import { UserIdParam } from '../../params/users/user-id.param';
import { CreateUserProfileRequest } from './create-user-profile-request.dto';

/**
 * Defines the DTO that carries data to update a user profile.
 *
 * @usageNotes
 * This DTO intersect {@link UserIdParam} with {@link CreateUserProfileRequest}.
 */
export class UpdateUserProfileRequest extends IntersectionType(
  UserIdParam,
  CreateUserProfileRequest,
) {
  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `UserProfile` entity
   */
  static toEntity(request: UpdateUserProfileRequest): UserProfile {
    return new UserProfile(request);
  }
}
