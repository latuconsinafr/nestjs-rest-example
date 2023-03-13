import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { GenericEntity } from '../../../common/entities/generic.entity';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../enums/user-role.enum';

/**
 * Defines the role entity.
 *
 * @usageNotes
 * The role entity contains attribute:
 * - `id`: The id of role
 * - `name`: The name of role
 * - `createdAt`: The creation time of role
 * - `updatedAt`: The last updation time of role
 * - `users`: The role users
 */
@Entity()
export class Role extends GenericEntity<Role> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { unique: true, enum: UserRole })
  name: UserRole;

  @ManyToMany(
    /* istanbul ignore next */ () => User,
    /* istanbul ignore next */ (user: User) => user.roles,
  )
  users: User[];
}
