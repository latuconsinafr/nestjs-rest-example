import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Defines the post entity.
 *
 * @usageNotes
 * The post entity contains attribute:
 * - `id`: The id of post
 * - `title`: The title of post
 * - `content`: The content of post
 * - `category`: The category of post
 * - `authorId`: The id of author of post
 * - `author`: The post author
 */
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column('uuid')
  authorId: string;

  @ManyToOne(/* istanbul ignore next */ () => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  author: User;

  /**
   * The constructor.
   *
   * @param partial The partial object of User
   */
  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
}
