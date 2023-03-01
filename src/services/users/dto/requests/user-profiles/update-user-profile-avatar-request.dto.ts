import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserProfile } from '../../../entities/user-profile.entity';
import { UserIdParam } from '../../params/users/user-id.param';

/**
 * Defines the DTO that carries data to update a user profile avatar.
 *
 * @usageNotes
 * This DTO extends {@link UserIdParam} with picked `id` attribute and contains additional attribute:
 * - `avatar`: The avatar of user profile
 */
export class UpdateUserProfileAvatarRequest extends PickType(UserIdParam, [
  'id',
] as const) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The avatar of user profile',
  })
  avatar: Express.Multer.File;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `UserProfile` entity
   */
  static toEntity(request: UpdateUserProfileAvatarRequest): UserProfile {
    return new UserProfile(request);
  }
}
