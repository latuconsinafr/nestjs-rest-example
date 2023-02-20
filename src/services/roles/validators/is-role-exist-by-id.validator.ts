import { Injectable } from '@nestjs/common';
import {
  isUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RolesService } from '../roles.service';

/**
 * Defines the IsRoleExistById validator constraint.
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class IsRoleExistByIdValidator implements ValidatorConstraintInterface {
  /**
   * The constructor.
   *
   * @param rolesService The roles service
   */
  constructor(private rolesService: RolesService) {}

  /**
   * Validates the role existence by its identifier.
   *
   * @param value The identifier to validate
   *
   * @returns The flag indicates whether the given role by its related identifier already exists or not.
   */
  async validate(value: string): Promise<boolean> {
    if (isUUID(value)) {
      return await this.rolesService.findById(value).then((role) => {
        if (role) return true;
        return false;
      });
    }

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
 * IsRoleExistById decorator.
 *
 * @example
 * `@IsRoleExistById()`
 *
 * @param validationOptions The additional validation options
 *
 * @returns custom IsRoleExistById validation decorator
 */
export function IsRoleExistById(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleExistByIdValidator,
    });
  };
}
