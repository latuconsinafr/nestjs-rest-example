import { plainToInstance } from 'class-transformer';
import { UserRole } from '../../common/enums/user-role.enum';
import { User } from '../../features/users/entities/user.entity';

/**
 * Dummy data for {@link User} entity.
 */
export const usersData: User[] = [
  plainToInstance(User, {
    id: 1,
    username: 'admin',
    password: 'password',
    roles: [UserRole.SuperAdmin],
    description: 'This is admin user',
  } as User),
];
