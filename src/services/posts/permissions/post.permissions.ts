import { InferSubjects } from '@casl/ability';
import { Permissions } from 'nest-casl';
import { UserRole } from '../../roles/enums/user-role.enum';
import { AccessControlActions } from '../../auth/enums/access-control-actions.enum';
import { Post } from '../entities/post.entity';

/**
 * Defines type for Post Subjects.
 */
export type PostSubjects = InferSubjects<typeof Post>;

/**
 * Defines type for Post Actions.
 */
export type PostActions = AccessControlActions;
export const PostActions = { ...AccessControlActions };

/**
 * Defines permission for PostSubjects against PostActions.
 */
export const PostPermissions: Permissions<UserRole, PostSubjects, PostActions> =
  {
    // * {UserRole.SuperAdmin}
    /* istanbul ignore next */ 'super-admin'({ can }) {
      can(PostActions.Manage, Post);
    },

    // * {UserRole.User}
    /* istanbul ignore next */ user({ user, can }) {
      can(PostActions.Create, Post);
      can(PostActions.ReadAll, Post);
      can(PostActions.ReadById, Post);
      can(PostActions.Update, Post, { authorId: user.id });
      can(PostActions.Delete, Post, { authorId: user.id });
    },
  };
