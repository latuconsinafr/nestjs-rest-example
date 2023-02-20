import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../enums/user-role.enum';

/**
 * Defines the role entity.
 *
 * @usageNotes
 * The User Entity contains attribute:
 * - `id`: The id of role
 * - `name`: The name of role
 * - `users`: The role users
 */
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { unique: true, enum: UserRole })
  name: UserRole;

  @ManyToMany(
    /* istanbul ignore next */ () => User,
    /* istanbul ignore next */ (user: User) => user.roles,
  )
  users: User[];

  /**
   * The constructor.
   *
   * @param partial The partial object of Role
   */
  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
