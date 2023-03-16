import { Injectable } from '@nestjs/common';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { PinoLogger } from 'nestjs-pino';
import { Topic } from '../../entities/topic.entity';
import { TopicsService } from '../../topics.service';

/**
 * Defines subject hook for {@link Topic} subject.
 * It hooks the {@link Topic} subject by its identifier.
 *
 * @usageNotes
 * For permissions with conditions we need to provide subject hook in {@link UseAccessControl} decorator.
 *
 * @see [Subject hook](https://github.com/getjerry/nest-casl#subject-hook)
 */
@Injectable()
export class TopicByIdHook implements SubjectBeforeFilterHook<Topic, Request> {
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
    this.logger.setContext(TopicByIdHook.name);
  }

  /**
   * Run {@link TopicByIdHook}.
   *
   * @param params The request parameter
   *
   * @returns The topic if it exists, otherwise undefined
   */
  async run({ params }: Request): Promise<Topic | undefined> {
    this.logger.info(`Try to call ${TopicByIdHook.prototype.run.name}`);

    return (await this.topicsService.findById(params.id)) ?? undefined;
  }
}
