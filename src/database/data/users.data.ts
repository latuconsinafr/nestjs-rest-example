import { UserRole } from '../../common/enums/user-role.enum';
import { User } from '../../features/users/entities/user.entity';

/**
 * Dummy data for {@link User} entity.
 */
export const usersData: User[] = [
  new User({
    id: 1,
    firstName: 'app',
    lastName: 'admin',
    username: 'admin',
    password: 'password',
    roles: [UserRole.SuperAdmin],
    description: 'This is admin user',
  }),
];
