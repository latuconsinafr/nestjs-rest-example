import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { UnprocessableEntityException } from '../../exceptions/unprocessable-entity.exception';
import { UsersService } from '../users.service';

/**
 * Defines the user by id pipe.
 */
@Injectable()
export class UserByIdPipe implements PipeTransform<string> {
  constructor(private readonly usersService: UsersService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new UnprocessableEntityException({
        message: 'Unable to parse the value to int',
      });
    }

    return this.usersService.findById(val);
  }
}
