import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { rolesData } from '../../../../database/data/roles.data';
import { IsRoleExistById } from '../../validators/is-role-exist-by-id.validator';

/**
 * Defines the DTO that carries the role identifier request parameter.
 */
export class RoleIdParam {
  @IsNotEmpty()
  @IsUUID('4')
  @IsRoleExistById()
  @ApiProperty({
    description: 'The id of role',
    format: 'uuid',
    example: rolesData[0].id,
  })
  id: string;
}
