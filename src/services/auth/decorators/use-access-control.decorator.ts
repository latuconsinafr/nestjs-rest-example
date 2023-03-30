import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  AccessGuard,
  AuthorizableRequest,
  SubjectBeforeFilterHook,
  SubjectBeforeFilterTuple,
  UseAbility,
} from 'nest-casl';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';

/**
 * Decorator that set a specified route path or controller or any below method to be accessible
 * controlled by a combination from {@link JwtAuthGuard}, {@link AccessGuard} and {@link UseAbility}.
 *
 * @param action The action representing action that the user can perform
 * @param subject The subject representing the user who perform
 * @param subjectHook The subject hook to apply permissions with conditions
 *
 * @returns The decorator that set access control.
 */
export function UseAccessControl<
  Subject = AnyObject,
  Request = AuthorizableRequest,
>(
  action: string,
  subject: AnyClass<Subject>,
  subjectHook?:
    | AnyClass<SubjectBeforeFilterHook<Subject, Request>>
    | SubjectBeforeFilterTuple<Subject, Request>,
) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, AccessGuard),
    UseAbility(action, subject, subjectHook),
  );
}
