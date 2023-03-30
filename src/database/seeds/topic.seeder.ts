import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Topic } from '../../services/topics/entities/topic.entity';
import { topicsData } from '../data/topics.data';

/**
 * Defines {@link Topic} entity seeder.
 */
export default class TopicSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Topic)
      .values([...topicsData])
      .orIgnore()
      .execute();
  }
}
