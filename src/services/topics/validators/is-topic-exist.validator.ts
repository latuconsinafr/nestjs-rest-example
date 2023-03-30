import { Injectable } from '@nestjs/common';
import {
  isUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TopicsService } from '../topics.service';

/**
 * Defines the IsTopicExist validator constraint.
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class IsTopicExistValidator implements ValidatorConstraintInterface {
  /**
   * The constructor.
   *
   * @param topicsService The topics service
   */
  constructor(private topicsService: TopicsService) {}

  /**
   * Validates the topic existence by its identifier.
   *
   * @param value The identifier to validate
   *
   * @returns The flag indicates whether the given topic by its related identifier already exists or not.
   */
  async validate(value: string): Promise<boolean> {
    if (isUUID(value, '4')) {
      return await this.topicsService.findById(value).then((topic) => {
        if (topic) return true;
        return false;
      });
    }

    return false;
  }

  /**
   * {@inheritDoc ValidatorConstraintInterface.defaultMessage}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `topic with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`;
  }
}

/**
 * IsTopicExist decorator.
 *
 * @example
 * `@IsTopicExist()`
 *
 * @param validationOptions The additional validation options
 *
 * @returns custom IsTopicExist validation decorator
 */
export function IsTopicExist(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTopicExistValidator,
    });
  };
}
