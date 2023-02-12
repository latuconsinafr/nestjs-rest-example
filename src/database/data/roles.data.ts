import { Role } from '../../services/roles/entities/role.entity';
import { UserRole } from '../../services/roles/enums/user-role.enum';

/**
 * Dummy data for {@link Role} entity.
 */
export const rolesData = [
  new Role({
    id: 1,
    name: UserRole.SuperAdmin,
  }),
  new Role({
    id: 2,
    name: UserRole.User,
  }),
] as const; // * Make it tuple to allow checked indexes {@see https://www.youtube.com/watch?v=nNse0r0aRT8&t=957s}
