import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { TimestampResponse } from '../../../../common/dto/responses/timestamp-response.dto';
import { rolesData } from '../../../../database/data/roles.data';
import { UserRole } from '../../enums/user-role.enum';
import { RoleIdParam } from '../params/role-id.param';

/**
 * Defines the DTO that carries data representing a role.
 *
 * @usageNotes
 * The DTO intersect {@link RoleIdParam} with {@link TimestampResponse}.
 *
 * The RoleResponse also contains role attribute:
 * - `name`: The name of role
 */
export class RoleResponse extends IntersectionType(
  RoleIdParam,
  TimestampResponse,
) {
  @ApiProperty({
    description: 'The name of role',
    enum: UserRole,
    example: rolesData[0].name,
  })
  name: UserRole;
}
