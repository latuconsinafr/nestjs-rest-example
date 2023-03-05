import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { PinoLogger } from 'nestjs-pino';
import { User } from '../../../entities/user.entity';
import { UsersService } from '../../../users.service';

/**
 * Defines subject hook for {@link User} subject.
 * It hooks the {@link User} subject by its identifier.
 *
 * @usageNotes
 * For permissions with conditions we need to provide subject hook in {@link UseAccessControl} decorator.
 *
 * @see [Subject hook](https://github.com/getjerry/nest-casl#subject-hook)
 */
@Injectable()
export class UserByIdHook implements SubjectBeforeFilterHook<User, Request> {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param usersService The users service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
  ) {
    this.logger.setContext(UserByIdHook.name);
  }

  /**
   * Run {@link UserByIdHook}.
   *
   * @param params The request parameter
   *
   * @returns The user if it exists, otherwise undefined
   */
  async run({ params }: Request): Promise<User | undefined> {
    this.logger.info(`Try to call ${UserByIdHook.prototype.run.name}`);

    return (await this.usersService.findById(params.id)) ?? undefined;
  }
}
