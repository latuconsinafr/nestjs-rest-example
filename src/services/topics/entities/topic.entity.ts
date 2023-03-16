import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenericEntity } from '../../../common/entities/generic.entity';
import { Post } from '../../posts/entities/post.entity';

/**
 * Defines the topic entity.
 *
 * @usageNotes
 * The topic entity contains attribute:
 * - `id`: The id of topic
 * - `name`: The name of topic
 * - `createdAt`: The creation time of topic
 * - `updatedAt`: The last updation time of topic
 * - `posts`: The topic posts
 */
@Entity()
export class Topic extends GenericEntity<Topic> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(
    /* istanbul ignore next */ () => Post,
    /* istanbul ignore next */ (post: Post) => post.topics,
  )
  posts: Post[];
}
