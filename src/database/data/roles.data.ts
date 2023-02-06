import { Role } from '../../services/roles/entities/role.entity';
import { UserRole } from '../../services/roles/enums/user-role.enum';

/**
 * Dummy data for {@link Role} entity.
 */
export const rolesData: Role[] = [
  new Role({
    id: 1,
    name: UserRole.SuperAdmin,
  }),
  new Role({
    id: 2,
    name: UserRole.User,
  }),
];
