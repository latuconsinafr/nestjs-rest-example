import { UserRole } from '../../common/enums/user-role.enum';
import { User } from '../../services/users/entities/user.entity';

/**
 * Dummy data for {@link User} entity.
 */
export const usersData: User[] = [
  new User({
    id: 1,
    username: 'user',
    email: 'user@gmail.com',
    phone: '+6282246924950',
    password: 'password',
    roles: [UserRole.User],
  }),
];
