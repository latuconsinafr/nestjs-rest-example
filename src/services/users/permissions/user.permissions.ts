import { InferSubjects } from '@casl/ability';
import { Permissions } from 'nest-casl';
import { User } from '../entities/user.entity';
import { AccessControlActions } from '../../auth/enums/access-control-actions.enum';
import { UserRole } from '../enums/user-role.enum';

/**
 * Defines type for User Subjects.
 */
export type UserSubjects = InferSubjects<typeof User>;

/**
 * Defines type for User Actions.
 */
enum UserAdditionalActions {
  UpdatePassword = 'update-password',
  UpdateRoles = 'update-roles',
  UpdateProfile = 'update-profile',
  UpdateProfileAvatar = 'update-profile-avatar',
}
export type UserActions = AccessControlActions & UserAdditionalActions;
export const UserActions = {
  ...AccessControlActions,
  ...UserAdditionalActions,
};

/**
 * Defines permission for UserSubjects against UserActions.
 */
export const UserPermissions: Permissions<UserRole, UserSubjects, UserActions> =
  {
    // * {UserRole.SuperAdmin}
    /* istanbul ignore next */ 'super-admin'({ can }) {
      can(UserActions.Manage, User);
    },

    // * {UserRole.User}
    /* istanbul ignore next */ user({ user, can }) {
      can(UserActions.ReadById, User);
      can(UserActions.Update, User, { id: user.id });
      can(UserActions.UpdatePassword, User, { id: user.id });
      can(UserActions.UpdateProfile, User, { id: user.id });
      can(UserActions.UpdateProfileAvatar, User, { id: user.id });
    },
  };
