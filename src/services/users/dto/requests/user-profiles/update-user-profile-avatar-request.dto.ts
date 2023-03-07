import { ApiProperty } from '@nestjs/swagger';
import { UserIdParam } from '../../params/users/user-id.param';

/**
 * Defines the DTO that carries data to update a user profile avatar.
 *
 * @usageNotes
 * This DTO extends {@link UserIdParam} with picked `id` attribute and contains additional attribute:
 * - `avatar`: The avatar of user profile
 */
export class UpdateUserProfileAvatarRequest extends UserIdParam {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The avatar of user profile',
  })
  avatar: Express.Multer.File;
}
