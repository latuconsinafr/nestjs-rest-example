import { ApiProperty } from '@nestjs/swagger';
import RoleResponse from '../../../../roles/dto/responses/role-response.dto';
import UserProfileResponse from '../user-profiles/user-profile-response.dto';

export default class UserResponse {
  @ApiProperty({
    description: 'The username of user',
    example: 'user',
  })
  username: string;

  @ApiProperty({
    description: 'The email of user',
    example: 'user@mail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of user',
    example: '+6282246924950',
  })
  phone: string;

  @ApiProperty({
    description: 'The profile of user',
    type: UserProfileResponse,
  })
  profile: UserProfileResponse;

  @ApiProperty({
    description: 'The roles of user',
    type: [RoleResponse],
  })
  roles: RoleResponse[];
}
