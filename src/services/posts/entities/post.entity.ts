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
 * - `content`: The content of post
 * - `authorId`: The id of author of post
 * - `topicIds`: The ids of topic of post
 * - `createdAt`: The creation time of post
 * - `updatedAt`: The last updation time of post
 * - `author`: The post author
 * - `topics`: The post topics
 */
@Entity()
export class Post extends GenericEntity<Post> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column('uuid')
  authorId: string;

  @ManyToOne(/* istanbul ignore next */ () => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  author: User;

  @RelationId((post: Post) => post.topics)
  topicIds: string[];

  @ManyToMany(
    /* istanbul ignore next */ () => Topic,
    /* istanbul ignore next */ (topic: Topic) => topic.posts,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinTable({ name: 'posts_topics' })
  topics: Topic[];
}
