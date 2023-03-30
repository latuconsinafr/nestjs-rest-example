import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../services/users/entities/user.entity';
import { usersData } from '../data/users.data';

/**
 * Defines {@link User} entity seeder.
 */
export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([...usersData])
      .orIgnore()
      .execute();
  }
}
