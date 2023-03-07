import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { UserProfile } from './user-profile.entity';

/**
 * Defines the user entity.
 *
 * @usageNotes
 * The user entity contains attribute:
 * - `id`: The id of user
 * - `username`: The username of user
 * - `email`: The email of user
 * - `phone`: The phone of user
 * - `password`: The password of user
 * - `lastSignedInAt`: The last signed in time of user
 * - `createdAt`: The creation time of user
 * - `updatedAt`: The last updation time of user
 * - `roles`: The user roles
 * - `profile`: The user profile
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  // * To be exactly the same with CreateDate & UpdateDate column, the column length should be set to 6 inside the migrations
  // * `ALTER TABLE \`user\` ADD \`lastSignedInAt\` datetime(6) NULL`
  @Column('datetime', { nullable: true })
  lastSignedInAt?: Date | null | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(
    /* istanbul ignore next */ () => Role,
    /* istanbul ignore next */ (role: Role) => role.users,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @OneToOne(
    /* istanbul ignore next */ () => UserProfile,
    /* istanbul ignore next */ (profile: UserProfile) => profile.user,
    {
      cascade: true,
    },
  )
  profile: UserProfile;

  /**
   * The constructor.
   *
   * @param partial The partial object of User
   */
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
