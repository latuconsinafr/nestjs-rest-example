import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../../common/enums/role.enum';

/**
 * Defines the user entity.
 *
 * @usageNotes
 * The CreateUserDto contains user attribute:
 * - `id`: The id of user
 * - `username`: The username of user
 * - `password`: The password of user
 * - `roles`: The roles of user
 * - `description`: The description of user
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('enum', { enum: UserRole })
  roles: UserRole[];

  @Column({ nullable: true })
  description?: string;
}
