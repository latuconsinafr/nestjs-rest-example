import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
 * - `createdAt`: The creation time of post
 * - `updatedAt`: The last updation time of post
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
