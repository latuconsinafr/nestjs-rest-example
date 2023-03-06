import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { LocalFile } from '../../storages/entities/local-file.entity';
import { User } from './user.entity';

/**
 * Defines the user profile entity.
 *
 * @usageNotes
 * The user profile entity contains attribute:
 * - `id`: The id of user profile, as the same as the id of user
 * - `firstName`: The first name of user profile
 * - `lastName`: The last name of user profile
 * - `fullName`: The full name of user profile (firstName + lastName)
 * - `bio`: The bio of user profile
 * - `location`: The location of user profile
 * - `website`: The website of user profile
 * - `birthDate`: The birthDate of user profile
 * - `avatarFileId`: The id of avatar file of user profile
 * - `user`: The profile user
 * - `avatarFile`: The profile avatar file
 */
@Entity()
export class UserProfile {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({ type: 'varchar', nullable: true })
  bio?: string | null | undefined;

  @Column({ type: 'varchar', nullable: true })
  location?: string | null | undefined;

  @Column({ type: 'varchar', nullable: true })
  website?: string | null | undefined;

  @Column()
  birthDate: Date;

  @Column('uuid', { nullable: true })
  avatarFileId?: string | undefined;

  @OneToOne(
    /* istanbul ignore next */ () => User,
    /* istanbul ignore next */ (user: User) => user.profile,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToOne(/* istanbul ignore next */ () => LocalFile, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  avatarFile?: LocalFile | undefined;

  /**
   * The constructor.
   *
   * @param partial The partial object of UserProfile
   */
  constructor(partial: Partial<UserProfile>) {
    Object.assign(this, partial);
  }
}
