import { InferSubjects } from '@casl/ability';
import { Permissions } from 'nest-casl';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/user-profile.entity';
import { UserRole } from '../../roles/enums/user-role.enum';
import { AccessControlActions } from '../../auth/enums/access-control-actions.enum';

/**
 * Defines type for User Subjects.
 */
export type UserSubjects = InferSubjects<typeof User | typeof UserProfile>;

/**
 * Defines type for User Actions.
 */
export type UserActions = AccessControlActions;
export const UserActions = { ...AccessControlActions };

/**
 * Defines permission for UserSubjects against UserActions.
 */
export const UserPermissions: Permissions<UserRole, UserSubjects, UserActions> =
  {
    // * {UserRole.SuperAdmin}
    'super-admin'({ can }) {
      can(UserActions.Manage, User);
      can(UserActions.Manage, UserProfile);
    },

    // * {UserRole.User}
    user({ user, can }) {
      can(UserActions.ReadBy, User, { id: user.id });
      can(UserActions.Update, User, { id: user.id });
    },
  };
