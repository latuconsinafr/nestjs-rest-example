import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

/**
 * Defines IsPhoneNumberUnique validator constraint.
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class IsPhoneNumberUniqueValidator
  implements ValidatorConstraintInterface
{
  /**
   * The constructor.
   *
   * @param usersService The users service
   */
  constructor(private usersService: UsersService) {}

  /**
   * Validates the phone uniqueness.
   *
   * @param value The phone to validate
   * @param validationArguments The additional validation arguments
   *
   * @returns The flag indicates whether the given phone is unique or not.
   */
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const { constraints, object } = validationArguments || {};
    const [identifierKey] = constraints || [];

    return await this.usersService.findByPhone(value).then((user) => {
      if (!user) {
        return true;
      }

      if (
        identifierKey &&
        object &&
        object[identifierKey as keyof object] ===
          user[identifierKey as keyof User]
      ) {
        return true;
      }

      return false;
    });
  }

  /**
   * {@inheritDoc ValidatorConstraintInterface.defaultMessage}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `user with ${validationArguments?.property} ${validationArguments?.value} already exists`;
  }
}

/**
 * IsPhoneNumberUnique decorator.
 *
 * To validate uniqueness against existing value, use the identifierKey to compare the incoming identifier is equal to the existing identifier,
 * if it equals then it would be bypassed.
 *
 * @example
 * `@IsPhoneNumberUnique()`
 * `@IsPhoneNumberUnique('id')`
 *
 * @param identifierKey The identifier field, used when the given resources are going to be updated
 * @param validationOptions The additional validation options
 *
 * @returns IsPhoneNumberUnique decorator
 */
export function IsPhoneNumberUnique(
  identifierKey?: keyof User,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [identifierKey],
      validator: IsPhoneNumberUniqueValidator,
    });
  };
}
