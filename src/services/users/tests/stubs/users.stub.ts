import { UserRole } from '../../../../common/enums/role.enum';
import { User } from '../../interfaces/user.interface';

export const usersStub = [
  {
    id: 1,
    username: 'user',
    password: 'password',
    roles: [UserRole.SUPER_ADMIN],
    description: 'This is user',
  },
] as User[];
