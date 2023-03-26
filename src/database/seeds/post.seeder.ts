import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../../services/posts/entities/post.entity';
import { postsData } from '../data/posts.data';

/**
 * Defines {@link Post} entity seeder.
 */
export default class PostSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([...postsData])
      .orIgnore()
      .execute();

    // * @see [Working with Relations](https://github.com/typeorm/typeorm/blob/master/docs/relational-query-builder.md)
    await Promise.all(
      postsData.map(async (postData) => {
        await Promise.all(
          postData.topics.map(async (topic) => {
            await dataSource
              .createQueryBuilder()
              .relation(Post, 'topics')
              .of(postData.id)
              .add(topic.id);
          }),
        );
      }),
    );
  }
}
