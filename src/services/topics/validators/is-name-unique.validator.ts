import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Topic } from '../entities/topic.entity';
import { TopicsService } from '../topics.service';

/**
 * Defines IsNameUnique validator constraint.
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class IsNameUniqueValidator implements ValidatorConstraintInterface {
  /**
   * The constructor.
   *
   * @param topicsService The topics service
   */
  constructor(private topicsService: TopicsService) {}

  /**
   * Validates the name uniqueness.
   *
   * @param value The name to validate
   * @param validationArguments The additional validation arguments
   *
   * @returns The flag indicates whether the given name is unique or not.
   */
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const { constraints, object } = validationArguments || {};
    const [identifierKey] = constraints || [];

    return await this.topicsService.findByName(value).then((topic) => {
      if (!topic) {
        return true;
      }

      if (
        identifierKey &&
        object &&
        object[identifierKey as keyof object] ===
          topic[identifierKey as keyof Topic]
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
    return `topic with ${validationArguments?.property} ${validationArguments?.value} already exists`;
  }
}

/**
 * IsNameUnique decorator.
 *
 * To validate uniqueness against existing value, use the identifierKey to compare the incoming identifier is equal to the existing identifier,
 * if it equals then it would be bypassed.
 *
 * @example
 * `@IsNameUnique()`
 * `@IsNameUnique('id')`
 *
 * @param identifierKey The identifier field, used when the given resources are going to be updated
 * @param validationOptions The additional validation options
 *
 * @returns IsNameUnique decorator
 */
export function IsNameUnique(
  identifierKey?: keyof Topic,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [identifierKey],
      validator: IsNameUniqueValidator,
    });
  };
}
