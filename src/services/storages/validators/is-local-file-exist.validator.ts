import { Injectable } from '@nestjs/common';
import {
  isUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { StoragesService } from '../storages.service';

/**
 * Defines the IsLocalFileExist validator constraint.
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class IsLocalFileExistValidator implements ValidatorConstraintInterface {
  /**
   * The constructor.
   *
   * @param storagesService The storages service
   */
  constructor(private storagesService: StoragesService) {}

  /**
   * Validates the local file existence by its identifier.
   *
   * @param value The identifier to validate
   *
   * @returns The flag indicates whether the given local file by its related identifier already exists or not.
   */
  async validate(value: string): Promise<boolean> {
    if (isUUID(value)) {
      return await this.storagesService
        .findLocalFileById(value)
        .then((file) => {
          if (file) return true;
          return false;
        });
    }

    return false;
  }

  /**
   * {@inheritDoc ValidatorConstraintInterface.defaultMessage}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `file with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`;
  }
}

/**
 * IsLocalFileExist decorator.
 *
 * @example
 * `@IsLocalFileExist()`
 *
 * @param validationOptions The additional validation options
 *
 * @returns custom IsLocalFileExist validation decorator
 */
export function IsLocalFileExist(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLocalFileExistValidator,
    });
  };
}
