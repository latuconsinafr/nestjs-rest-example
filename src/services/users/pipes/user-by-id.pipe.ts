import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

/**
 * Class defining the implementation of a pipe that parse string UUID value
 * and return the promise of user entity of related identifier value.
 *
 * @usageNotes
 * The transform method will throw {@link UnprocessableEntityException}, if fail to validate the string UUID value.
 *
 * Also the transform method will throw {@link NotFoundException}, if fail to parse the user entity from the parsed string UUID user identifier value.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<User>> {
  constructor(private readonly usersService: UsersService) {}

  /**
   * {@inheritDoc PipeTransform.transform}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: string, metadata: ArgumentMetadata): Promise<User> {
    if (!isUUID(value, '4')) {
      throw new UnprocessableEntityException({
        message: 'The given value is not a valid UUID',
      });
    }

    const user = await this.usersService.findById(value);

    if (user === null) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    return user;
  }
}
