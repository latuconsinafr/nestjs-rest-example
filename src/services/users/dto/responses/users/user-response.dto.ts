import { ApiProperty, PickType } from '@nestjs/swagger';
import { usersData } from '../../../../../database/data/users.data';
import { RoleResponse } from '../../../../roles/dto/responses/role-response.dto';
import { UserIdParam } from '../../params/users/user-id.param';
import { UserProfileResponse } from '../user-profiles/user-profile-response.dto';

/**
 * Defines the DTO that carries data representing a user.
 *
 * @usageNotes
 * The DTO pick {@link UserIdParam} id attribute.
 *
 * The UserResponse also contains user attribute:
 * - `username`: The username of user
 * - `email`: The email of user
 * - `phone`: The phone of user
 * - `roles`: The user roles
 * - `profile`: The user profile
 */
export class UserResponse extends PickType(UserIdParam, ['id'] as const) {
  @ApiProperty({
    description: 'The username of user',
    example: usersData[0].username,
  })
  username: string;

  @ApiProperty({
    description: 'The email of user',
    example: usersData[0].email,
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of user',
    example: usersData[0].phone,
  })
  phone: string;

  @ApiProperty({
    description: 'The roles of user',
    type: [RoleResponse],
  })
  roles: RoleResponse[];

  @ApiProperty({
    description: 'The profile of user',
    type: UserProfileResponse,
  })
  profile: UserProfileResponse;
}
