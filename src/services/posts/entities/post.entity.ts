import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { GenericEntity } from '../../../common/entities/generic.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { User } from '../../users/entities/user.entity';

/**
 * Defines the post entity.
 *
 * @usageNotes
 * The post entity contains attribute:
 * - `id`: The id of post
 * - `title`: The title of post
 * - `category`: The category of post
 * - `createdAt`: The creation time of post
 * - `updatedAt`: The last updation time of post
 * - `authorId`: The id of author of post
 * - `author`: The post author
 */
@Entity()
export class Post extends GenericEntity<Post> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @RelationId((post: Post) => post.topics)
  topicIds: string[];

  @Column('uuid')
  authorId: string;

  @ManyToOne(/* istanbul ignore next */ () => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  author: User;

  @ManyToMany(
    /* istanbul ignore next */ () => Topic,
    /* istanbul ignore next */ (topic: Topic) => topic.posts,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinTable({ name: 'posts_topics' })
  topics: Topic[];
}
