import { AbilityBuilder } from '@casl/ability';
import { LocalFile } from '../../../../services/storages/entities/local-file.entity';
import { FileGeneralAccess } from '../../../../services/storages/enums/file-general-access.enum';
import { User } from '../../../../services/users/entities/user.entity';
import { UserRole } from '../../../../services/users/enums/user-role.enum';
import { Actions, AppAbility } from '../casl-ability.factory';

export function StoragesAbility(
  user: User,
  abilityBuilder: AbilityBuilder<AppAbility>,
): AbilityBuilder<AppAbility> {
  if (user.roles.includes(UserRole.User)) {
    abilityBuilder.can(Actions.GeneralAccess, LocalFile, {
      generalAccess: FileGeneralAccess.Public,
    });
    // abilityBuilder.can(Actions.GeneralAccess, LocalFile, { ownerId: user.id });
  }
  return abilityBuilder;
}
