import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../common/exceptions/unprocessable-entity.exception';
import { Topic } from '../entities/topic.entity';
import { TopicsService } from '../topics.service';

/**
 * Class defining the implementation of a pipe that parse string UUID value
 * and return the promise of topic entity of related identifier value.
 *
 * @usageNotes
 * The transform method will throw {@link UnprocessableEntityException}, if fail to validate the string UUID value.
 *
 * Also the transform method will throw {@link NotFoundException}, if fail to parse the topic entity from the parsed string UUID topic identifier value.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
@Injectable()
export class TopicByIdPipe implements PipeTransform<string, Promise<Topic>> {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param topicsService The topics service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly topicsService: TopicsService,
  ) {
    this.logger.setContext(TopicByIdPipe.name);
  }

  /**
   * {@inheritDoc PipeTransform.transform}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: string, metadata: ArgumentMetadata): Promise<Topic> {
    this.logger.info(`Try to call ${TopicByIdPipe.prototype.transform.name}`);

    if (!isUUID(value, '4')) {
      throw new UnprocessableEntityException({
        message: 'The given value is not a valid UUID',
      });
    }

    const topic = await this.topicsService.findById(value);

    if (topic === null) {
      throw new NotFoundException({
        message: 'Topic not found',
      });
    }

    return topic;
  }
}
