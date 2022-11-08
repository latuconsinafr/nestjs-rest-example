import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../exceptions/unprocessable-entity.exception';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../users.service';

/**
 * Defines the user by id pipe.
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
      throw new NotFoundException();
    }

    return user;
  }
}
