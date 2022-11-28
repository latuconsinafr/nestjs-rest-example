import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

/**
 * Defines the user profile entity.
 *
 * @usageNotes
 * The UserProfile Entity contains attribute:
 * - `id`: The id of user profile, as the same as the id of user
 * - `firstName`: The first name of user profile
 * - `lastName`: The last name of user profile
 * - `fullName`: The full name of user profile (firstName + lastName)
 * - `bio`: The bio of user profile
 * - `location`: The location of user profile
 * - `website`: The website of user profile
 * - `birthDate`: The birthDate of user profile
 */
@Entity()
export class UserProfile {
  @PrimaryColumn()
  id: number;

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

  @OneToOne(
    /* istanbul ignore next */ () => User,
    /* istanbul ignore next */ (user: User) => user.profile,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'id' })
  user: User;

  constructor(partial: Partial<UserProfile>) {
    Object.assign(this, partial);
  }
}
