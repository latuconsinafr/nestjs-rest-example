import { Role } from '../../services/roles/entities/role.entity';
import { UserRole } from '../../services/roles/enums/user-role.enum';

/**
 * Dummy data for {@link Role} entity.
 */
export const rolesData = [
  new Role({
    id: '0f3735ea-2beb-4dfa-88b3-55789ce80483',
    name: UserRole.SuperAdmin,
  }),
  new Role({
    id: 'a3f33410-9bc6-416b-8c1f-acaae66e3829',
    name: UserRole.User,
  }),
] as const; // * Make it tuple to allow checked indexes {@see https://www.youtube.com/watch?v=nNse0r0aRT8&t=957s}
