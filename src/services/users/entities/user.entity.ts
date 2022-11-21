import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../../common/enums/user-role.enum';

/**
 * Defines the user entity.
 *
 * @usageNotes
 * The CreateUserDto contains user attribute:
 * - `id`: The id of user
 * - `firstName`: The first name of user
 * - `lastName`: The last name of user
 * - `fullName`: The full name of user (firstName + lastName)
 * - `username`: The username of user
 * - `password`: The password of user
 * - `roles`: The roles of user
 * - `description`: The description of user
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column('enum', { enum: UserRole })
  roles: UserRole[];

  @Column({ type: 'text', nullable: true })
  description?: string | null | undefined;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
