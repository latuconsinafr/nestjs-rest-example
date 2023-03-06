import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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
