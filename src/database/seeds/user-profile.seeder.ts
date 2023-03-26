import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserProfile } from '../../services/users/entities/user-profile.entity';
import { userProfilesData } from '../data/user-profiles.data';

/**
 * Defines {@link UserProfile} entity seeder.
 */
export default class UserProfileSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(UserProfile)
      .values([...userProfilesData])
      .orIgnore()
      .execute();
  }
}
