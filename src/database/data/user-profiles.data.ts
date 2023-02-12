import { UserProfile } from '../../services/users/entities/user-profile.entity';
import { localFilesData } from './local-files.data';
import { usersData } from './users.data';

/**
 * Dummy data for {@link UserProfile} entity.
 */
export const userProfilesData = [
  new UserProfile({
    id: usersData[0].id,
    firstName: 'Super',
    lastName: 'Admin',
    bio: null,
    location: 'Indonesia',
    website: null,
    birthDate: new Date('1995-08-06'),
    avatarFileId: localFilesData[0].id,
  }),
  new UserProfile({
    id: usersData[1].id,
    firstName: 'A',
    lastName: 'User',
    bio: null,
    location: 'Indonesia',
    website: null,
    birthDate: new Date('1995-08-06'),
    avatarFileId: localFilesData[1].id,
  }),
] as const; // * Make it tuple to allow checked indexes {@see https://www.youtube.com/watch?v=nNse0r0aRT8&t=957s}
