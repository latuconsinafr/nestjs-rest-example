import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../common/exceptions/unprocessable-entity.exception';
import { Post } from '../entities/post.entity';
import { PostsService } from '../posts.service';

/**
 * Class defining the implementation of a pipe that parse string UUID value
 * and return the promise of post entity of related identifier value.
 *
 * @usageNotes
 * The transform method will throw {@link UnprocessableEntityException}, if fail to validate the string UUID value.
 *
 * Also the transform method will throw {@link NotFoundException}, if fail to parse the post entity from the parsed string UUID post identifier value.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
@Injectable()
export class PostByIdPipe implements PipeTransform<string, Promise<Post>> {
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
    this.logger.setContext(PostByIdPipe.name);
  }

  /**
   * {@inheritDoc PipeTransform.transform}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: string, metadata: ArgumentMetadata): Promise<Post> {
    this.logger.info(`Try to call ${PostByIdPipe.prototype.transform.name}`);

    if (!isUUID(value, '4')) {
      throw new UnprocessableEntityException({
        message: 'The given value is not a valid UUID',
      });
    }

    const post = await this.postsService.findById(value);

    if (post === null) {
      throw new NotFoundException({
        message: 'Post not found',
      });
    }

    return post;
  }
}
