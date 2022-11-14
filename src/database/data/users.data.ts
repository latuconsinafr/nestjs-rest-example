import { plainToInstance } from 'class-transformer';
import { UserRole } from '../../common/enums/role.enum';
import { User } from '../../services/users/entities/user.entity';

/**
 * Dummy data for {@link User} entity.
 */
export const usersData: User[] = [
  plainToInstance(User, {
    id: 1,
    username: 'admin',
    password: 'password',
    roles: [UserRole.SUPER_ADMIN],
    description: 'This is admin user',
  } as User),
];
