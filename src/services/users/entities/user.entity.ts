import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserProfile } from './user-profile.entity';

/**
 * Defines the user entity.
 *
 * @usageNotes
 * The User Entity contains attribute:
 * - `id`: The id of user
 * - `username`: The username of user
 * - `email`: The email of user
 * - `phone`: The phone of user
 * - `password`: The password of user
 * - `roles`: The roles of user
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column('enum', { enum: UserRole })
  roles: UserRole[];

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
