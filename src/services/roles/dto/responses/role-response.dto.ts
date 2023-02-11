import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/user-role.enum';

export default class RoleResponse {
  @ApiProperty({
    description: 'The name of role',
    enum: UserRole,
    example: UserRole.User,
  })
  name: UserRole;
}
