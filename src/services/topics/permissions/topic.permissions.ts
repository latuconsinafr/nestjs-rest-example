import { InferSubjects } from '@casl/ability';
import { Permissions } from 'nest-casl';
import { AccessControlActions } from '../../auth/enums/access-control-actions.enum';
import { UserRole } from '../../users/enums/user-role.enum';
import { Topic } from '../entities/topic.entity';

/**
 * Defines type for Topic Subjects.
 */
export type TopicSubjects = InferSubjects<typeof Topic>;

/**
 * Defines type for Topic Actions.
 */
export type TopicActions = AccessControlActions;
export const TopicActions = {
  ...AccessControlActions,
};

/**
 * Defines permission for TopicSubjects against TopicActions.
 */
export const TopicPermissions: Permissions<
  UserRole,
  TopicSubjects,
  TopicActions
> = {
  // * {UserRole.SuperAdmin}
  /* istanbul ignore next */ 'super-admin'({ can }) {
    can(TopicActions.Manage, Topic);
  },

  // * {UserRole.User}
  /* istanbul ignore next */ user({ can }) {
    can(TopicActions.ReadAll, Topic);
    can(TopicActions.ReadById, Topic);
  },
};
