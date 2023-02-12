import { User } from '../../services/users/entities/user.entity';
import { rolesData } from './roles.data';

/**
 * Dummy data for {@link User} entity.
 */
export const usersData = [
  new User({
    id: 1,
    username: 'super-admin',
    email: 'super_admin@mail.com',
    phone: '+6282246924950',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$AJgltBJ0WY3dCBHs8/Hmgw$56y+zKfzef2qaaFWXYRLXw4VTjHjm1KJwgc8zngSp80',
    roles: [rolesData[0]],
  }),
  new User({
    id: 2,
    username: 'user',
    email: 'user@mail.com',
    phone: '+6281231142801',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$AJgltBJ0WY3dCBHs8/Hmgw$56y+zKfzef2qaaFWXYRLXw4VTjHjm1KJwgc8zngSp80',
    roles: [rolesData[1]],
  }),
] as const; // * Make it tuple to allow checked indexes {@see https://www.youtube.com/watch?v=nNse0r0aRT8&t=957s}
