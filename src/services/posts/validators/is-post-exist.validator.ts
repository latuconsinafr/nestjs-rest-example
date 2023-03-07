import { Injectable } from '@nestjs/common';
import {
  isUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PostsService } from '../posts.service';

/**
 * Defines the IsPostExist validator constraint.
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class IsPostExistValidator implements ValidatorConstraintInterface {
  /**
   * The constructor.
   *
   * @param postsService The posts service
   */
  constructor(private postsService: PostsService) {}

  /**
   * Validates the post existence by its identifier.
   *
   * @param value The identifier to validate
   *
   * @returns The flag indicates whether the given post by its related identifier already exists or not.
   */
  async validate(value: string): Promise<boolean> {
    if (isUUID(value, '4')) {
      return await this.postsService.findById(value).then((post) => {
        if (post) return true;
        return false;
      });
    }

    return false;
  }

  /**
   * {@inheritDoc ValidatorConstraintInterface.defaultMessage}
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `post with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`;
  }
}

/**
 * IsPostExist decorator.
 *
 * @example
 * `@IsPostExist()`
 *
 * @param validationOptions The additional validation options
 *
 * @returns custom IsPostExist validation decorator
 */
export function IsPostExist(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPostExistValidator,
    });
  };
}
