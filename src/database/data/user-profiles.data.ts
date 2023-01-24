import { UserProfile } from '../../services/users/entities/user-profile.entity';
import { localFilesData } from './local-files.data';
import { usersData } from './users.data';

/**
 * Dummy data for {@link UserProfile} entity.
 */
export const userProfilesData: UserProfile[] = [
  new UserProfile({
    id: usersData[0].id,
    firstName: 'New',
    lastName: 'User',
    bio: null,
    location: 'Indonesia',
    website: null,
    birthDate: new Date('1995-08-06'),
    avatarFileId: localFilesData[0].id,
  }),
];
