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
import { UserAction } from './actions/user.action';
import { UserSubject } from './subjects/user.subject';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  ReadAll = 'read-all',
  ReadSingle = 'read-single',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<UserSubject> | 'all';
export const Actions = { ...Action, ...UserAction };
export type Actions = Action | UserAction;
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

  checkAbility(user: User, action: Actions, subject: Subjects): boolean {
    if (this.createForUser(user).can(action, subject)) {
      return true;
    }

    throw new ForbiddenException();
  }
}
