import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '../../../exceptions/http.exceptions';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../users.service';

/**
 * Class defining the implementation of a pipe that parse int from any string value {@link ParseIntPipe},
 * also parse the user entity from the parsed int user identifier value.
 *
 * @usageNotes
 * The transform method will throw {@link UnprocessableEntityException}, if fail to parse the string value.
 *
 * Also the transform method will throw {@link NotFoundException}, if fail to parse the user entity from the parsed int user identifier value.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
@Injectable()
export class UserByIdPipe implements PipeTransform<string> {
  constructor(private readonly usersService: UsersService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): User {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new UnprocessableEntityException({
        message: 'Unable to parse the value to int',
      });
    }

    const user = this.usersService.findById(val);

    if (user === undefined) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    return user;
  }
}
