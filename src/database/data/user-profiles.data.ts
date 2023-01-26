import { UserProfile } from '../../services/users/entities/user-profile.entity';

/**
 * Dummy data for {@link UserProfile} entity.
 */
export const userProfilesData: UserProfile[] = [
  new UserProfile({
    id: 1,
    firstName: 'New',
    lastName: 'User',
    bio: null,
    location: 'Indonesia',
    website: null,
    birthDate: new Date('1995-08-06'),
    avatarFileId: 1,
  }),
];
