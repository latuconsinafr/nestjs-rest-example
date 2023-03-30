import { User } from '../../services/users/entities/user.entity';
import { UserRole } from '../../services/users/enums/user-role.enum';

/**
 * Dummy data for {@link User} entity.
 */
export const usersData = [
  new User({
    id: '279f5342-cbf3-45bf-96ab-4f295da3cd0e',
    username: 'super-admin',
    email: 'super_admin@mail.com',
    phone: '+6282246924950',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$AJgltBJ0WY3dCBHs8/Hmgw$56y+zKfzef2qaaFWXYRLXw4VTjHjm1KJwgc8zngSp80', // password
    roles: [UserRole.SuperAdmin],
  }),
  new User({
    id: '3e4c44dc-9382-458a-a8db-289b54b7e34e',
    username: 'user',
    email: 'user@mail.com',
    phone: '+6281231142801',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$AJgltBJ0WY3dCBHs8/Hmgw$56y+zKfzef2qaaFWXYRLXw4VTjHjm1KJwgc8zngSp80', // password
    roles: [UserRole.User],
  }),
] as const; // * Make it tuple to allow checked indexes {@see https://www.youtube.com/watch?v=nNse0r0aRT8&t=957s}
