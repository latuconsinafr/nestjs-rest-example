import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { PinoLogger } from 'nestjs-pino';
import { Post } from '../../entities/post.entity';
import { PostsService } from '../../posts.service';

/**
 * Defines subject hook for {@link Post} subject.
 * It hooks the {@link Post} subject by its identifier.
 *
 * @usageNotes
 * For permissions with conditions we need to provide subject hook in {@link UseAccessControl} decorator.
 *
 * @see [Subject hook](https://github.com/getjerry/nest-casl#subject-hook)
 */
@Injectable()
export class PostByIdHook implements SubjectBeforeFilterHook<Post, Request> {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param postsService The posts service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly postsService: PostsService,
  ) {
    this.logger.setContext(PostByIdHook.name);
  }

  /**
   * Run {@link PostByIdHook}.
   *
   * @param params The request parameter
   *
   * @returns The post if it exists, otherwise undefined
   */
  async run({ params }: Request): Promise<Post | undefined> {
    this.logger.info(`Try to call ${PostByIdHook.prototype.run.name}`);

    return (await this.postsService.findById(params.id)) ?? undefined;
  }
}
