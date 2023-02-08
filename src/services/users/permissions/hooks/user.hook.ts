import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../users.service';

/**
 * Defines subject hook for {@link User} subject.
 *
 * @usageNotes
 * For permissions with conditions we need to provide subject hook in {@link UseAccessControl} decorator.
 *
 * @see [Subject hook](https://github.com/getjerry/nest-casl#subject-hook)
 */
@Injectable()
export class UserHook implements SubjectBeforeFilterHook<User, Request> {
  /**
   * The constructor.
   *
   * @param usersService The users service
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Run {@link UserHook}.
   *
   * @param params The request parameter
   *
   * @returns The user if it exists, otherwise undefined
   */
  async run({ params }: Request): Promise<User | undefined> {
    return (await this.usersService.findById(params.id)) ?? undefined;
  }
}
