import { AbilityBuilder } from '@casl/ability';
import { User } from '../../../../services/users/entities/user.entity';
import { UserRole } from '../../../../services/users/enums/user-role.enum';
import { Actions, AppAbility } from '../casl-ability.factory';

export function UserAbility(
  user: User,
  abilityBuilder: AbilityBuilder<AppAbility>,
): AbilityBuilder<AppAbility> {
  if (user.roles.includes(UserRole.User)) {
    abilityBuilder.can(Actions.ReadSingle, User, { id: user.id });
    abilityBuilder.can(Actions.Update, User, { id: user.id });
  }
  return abilityBuilder;
}
