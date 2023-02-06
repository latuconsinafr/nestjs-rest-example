import { InferSubjects } from '@casl/ability';
import { Permissions } from 'nest-casl';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/user-profile.entity';
import { Actions } from '../../../common/permissions/actions.enum';
import { UserRole } from '../../roles/enums/user-role.enum';

type Subjects = InferSubjects<typeof User | typeof UserProfile>;

export const UserPermission: Permissions<UserRole, Subjects, Actions> = {
  'super-admin'({ can }) {
    can(Actions.Manage, User);
    can(Actions.Manage, UserProfile);
  },

  user({ user, can }) {
    can(Actions.ReadBy, User, { id: user.id });
    can(Actions.Update, User, { id: user.id });
  },
};
