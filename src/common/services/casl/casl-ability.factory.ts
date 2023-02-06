import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../../../services/users/entities/user.entity';
import { UserRole } from '../../../services/users/enums/user-role.enum';
import { ForbiddenException } from '../../exceptions/forbidden.exception';
import { UserAbility } from './abilities/user.ability';
import { StoragesAction } from './actions/storages.action';
import { UsersAction } from './actions/users.action';
import { StorageSubject } from './subjects/storages.subject';
import { UserSubject } from './subjects/user.subject';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  ReadAll = 'read-all',
  ReadSingle = 'read-single',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = 'all' | InferSubjects<UserSubject | StorageSubject>;
export const Actions = { ...Action, ...UsersAction, ...StoragesAction };
export type Actions = Action | StoragesAction;
export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): Ability<[Actions, Subjects]> {
    let abilityBuilder = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.roles.includes(UserRole.SuperAdmin)) {
      abilityBuilder.can(Actions.Manage, 'all'); // read-write access to everything
    }

    abilityBuilder = UserAbility(user, abilityBuilder);

    return abilityBuilder.build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  checkUserAbility(user: User, action: Actions, subject: Subjects): boolean {
    if (user && this.createForUser(user).can(action, subject)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
