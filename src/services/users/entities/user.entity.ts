import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { GenericEntity } from '../../../common/entities/generic.entity';
import { UserRole } from '../enums/user-role.enum';
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
 * - `roles`: The roles of user
 * - `lastSignedInAt`: The last signed in time of user
 * - `createdAt`: The creation time of user
 * - `updatedAt`: The last updation time of user
 * - `profileId`: The profile id of user
 * - `profile`: The user profile
 */
@Entity()
export class User extends GenericEntity<User> {
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

  @Column('set', { enum: UserRole })
  roles: UserRole[];

  // * To be exactly the same with CreateDate & UpdateDate column, the column length should be set to 6 inside the migrations manually
  // * `ALTER TABLE \`user\` ADD \`lastSignedInAt\` datetime(6) NULL`
  @Column('datetime', { nullable: true })
  lastSignedInAt?: Date | null | undefined;

  @RelationId((user: User) => user.profile)
  profileId: string;

  @OneToOne(
    /* istanbul ignore next */ () => UserProfile,
    /* istanbul ignore next */ (profile: UserProfile) => profile.user,
    {
      cascade: true,
    },
  )
  profile: UserProfile;
}
