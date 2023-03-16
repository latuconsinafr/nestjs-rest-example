import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';
import { APP_VERSION } from '../../common/constants';
import { ApiErrorsResponse } from '../../common/decorators/open-api/api-errors-response.decorator';
import { ApiSuccessesResponse } from '../../common/decorators/open-api/api-successes-response.decorator';
import { ApiConflictErrorResponse } from '../../common/decorators/open-api/errors/api-conflict-error-response.decorator';
import { ApiForbiddenErrorResponse } from '../../common/decorators/open-api/errors/api-forbidden-error-response.decorator';
import { ApiNotFoundErrorResponse } from '../../common/decorators/open-api/errors/api-not-found-error-response.decorator';
import { ApiUnauthorizedErrorResponse } from '../../common/decorators/open-api/errors/api-unauthorized-error-response.decorator';
import { ApiUnprocessableEntityErrorResponse } from '../../common/decorators/open-api/errors/api-unprocessable-entity-error-response.decorator';
import { ApiUuidParam } from '../../common/decorators/open-api/params/api-uuid-param.decorator';
import { ApiCreatedSuccessResponse } from '../../common/decorators/open-api/successes/api-created-success-response.decorator';
import { ApiOkSuccessResponse } from '../../common/decorators/open-api/successes/api-ok-success-response.decorator';
import { SuccessResponse } from '../../common/dto/responses/success-response.dto';
import { ConflictException } from '../../common/exceptions/conflict.exception';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import { UseAccessControl } from '../auth/decorators/use-access-control.decorator';
import { CreateTopicRequest } from './dto/requests/create-topic-request.dto';
import { UpdateTopicRequest } from './dto/requests/update-topic-request.dto';
import { TopicResponse } from './dto/responses/topic-response.dto';
import { Topic } from './entities/topic.entity';
import { TopicActions } from './permissions/topic.permissions';
import { TopicByIdPipe } from './pipes/topic-by-id.pipe';
import { TopicsService } from './topics.service';

/**
 * Defines the topics controller.
 */
@Controller({
  path: 'topics',
  version: APP_VERSION,
})
@ApiTags('Topics')
export class TopicsController {
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
    this.logger.setContext(TopicsController.name);
  }

  /**
   * Create a topic endpoint.
   *
   * @param createTopicRequest The DTO that carries data to create a topic
   *
   * @returns The success response with `'Topic created'` message and created `topic` data.
   */
  @Post()
  @UseAccessControl(TopicActions.Create, Topic)
  @ApiBearerAuth()
  @ApiSuccessesResponse([
    {
      response: ApiCreatedSuccessResponse,
      options: {
        model: TopicResponse,
        options: { description: 'Topic created' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async createTopic(
    @Body() createTopicRequest: CreateTopicRequest,
  ): Promise<SuccessResponse<TopicResponse>> {
    this.logger.info(
      `Try to call ${TopicsController.prototype.createTopic.name}`,
    );

    try {
      return new SuccessResponse({
        message: 'Topic created',
        data: await this.topicsService.create(
          CreateTopicRequest.toEntity(createTopicRequest),
        ),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Get all topics endpoint.
   *
   * @returns The success response with `'Topics retrieved'` message and `topics` data.
   */
  @Get()
  @UseAccessControl(TopicActions.ReadAll, Topic)
  @ApiBearerAuth()
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        model: TopicResponse,
        isArray: true,
        options: { description: 'Topics retrieved' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
  ])
  async findAllTopics(): Promise<SuccessResponse<TopicResponse[]>> {
    this.logger.info(
      `Try to call ${TopicsController.prototype.findAllTopics.name}`,
    );

    try {
      return new SuccessResponse({
        message: 'Topics retrieved',
        data: await this.topicsService.findAll(),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Get a topic by a given id endpoint.
   *
   * @param topic The specified topic to get
   *
   * @returns The success response with `'Topic retrieved'` message and a `topic` data.
   */
  @Get(':id')
  @UseAccessControl(TopicActions.ReadById, Topic)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of topic' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        model: TopicResponse,
        options: { description: 'Topic retrieved' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiNotFoundErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async findTopicById(
    @Param('id', TopicByIdPipe) topic: Topic,
  ): Promise<SuccessResponse<TopicResponse>> {
    this.logger.info(
      `Try to call ${TopicsController.prototype.findTopicById.name}`,
    );

    return new SuccessResponse({
      message: 'Topic retrieved',
      data: topic,
    });
  }

  /**
   * Update a topic by a given id endpoint.
   *
   * @param id The topic id request parameter
   * @param updateTopicRequest The DTO that carries data to update a topic
   *
   * @returns The success response with `'Topic updated'` message.
   */
  @Put(':id')
  @UseAccessControl(TopicActions.Update, Topic)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of topic' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'Topic updated' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiNotFoundErrorResponse },
    { response: ApiConflictErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async updateTopic(
    @Param('id', TopicByIdPipe) { id }: Topic,
    @Body() updateTopicRequest: UpdateTopicRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${TopicsController.prototype.updateTopic.name}`,
    );

    if (id !== updateTopicRequest.id) {
      throw new ConflictException({ message: `Inconsistent topic id` });
    }

    try {
      await this.topicsService.update(
        id,
        UpdateTopicRequest.toEntity(updateTopicRequest),
      );

      return new SuccessResponse({
        message: 'Topic updated',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Delete a topic by a given id endpoint.
   *
   * @param id The topic id to find
   *
   * @returns The success response with `'User deleted'` message.
   */
  @Delete(':id')
  @UseAccessControl(TopicActions.Delete, Topic)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of topic' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'Topic deleted' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiNotFoundErrorResponse },
  ])
  async deleteTopic(
    @Param('id', TopicByIdPipe) { id }: Topic,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${TopicsController.prototype.deleteTopic.name}`,
    );

    try {
      await this.topicsService.delete(id);

      return new SuccessResponse({
        message: 'Topic deleted',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
