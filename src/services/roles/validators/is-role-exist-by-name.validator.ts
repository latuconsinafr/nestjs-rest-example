import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { RolesService } from '../roles.service';

/**
 * Defines the IsRoleExistByName validator constraint.
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class IsRoleExistByNameValidator
  implements ValidatorConstraintInterface
{
  /**
   * The constructor.
   *
   * @param rolesService The roles service
   */
  constructor(private rolesService: RolesService) {}

  /**
   * Validates the role existence by its name.
   *
   * @param value The name to validate
   *
   * @returns The flag indicates whether the given role by its related name already exists or not.
   */
  async validate(value: UserRole): Promise<boolean> {
    return await this.rolesService.findByName(value).then((role) => {
      if (role) return true;
      return false;
    });

    return false;
  }

  /**
   * {@inheritDoc ValidatorConstraintInterface.defaultMessage}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `role with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`;
  }
}

/**
 * IsRoleExistByName decorator.
 *
 * @example
 * `@IsRoleExistByName()`
 *
 * @param validationOptions The additional validation options
 *
 * @returns custom IsRoleExistByName validation decorator
 */
export function IsRoleExistByName(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleExistByNameValidator,
    });
  };
}
