import { ApiProperty, PickType } from '@nestjs/swagger';
import { rolesData } from '../../../../database/data/roles.data';
import { UserRole } from '../../enums/user-role.enum';
import { RoleIdParam } from '../params/role-id.param';

/**
 * Defines the DTO that carries data representing a role.
 *
 * @usageNotes
 * The DTO pick {@link RoleIdParam} id attribute.
 *
 * The RoleResponse also contains role attribute:
 * - `name`: The name of role
 */
export class RoleResponse extends PickType(RoleIdParam, ['id'] as const) {
  @ApiProperty({
    description: 'The name of role',
    enum: UserRole,
    example: rolesData[0].name,
  })
  name: UserRole;
}
