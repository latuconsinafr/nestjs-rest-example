import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
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
import RequestWithAuthUser from '../auth/interface/request-with-auth-user.interface';
import { TopicsService } from '../topics/topics.service';
import { CreatePostRequest } from './dto/requests/create-post-request.dto';
import { UpdatePostRequest } from './dto/requests/update-post-request.dto';
import { UpdatePostTopicsRequest } from './dto/requests/update-post-topics-request.dto';
import { PostResponse } from './dto/responses/post-response.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostByIdHook } from './permissions/hooks/post-by-id.hook';
import { PostActions } from './permissions/post.permissions';
import { PostByIdPipe } from './pipes/post-by-id.pipe';
import { PostsService } from './posts.service';

/**
 * Defines the posts controller.
 */
@Controller({
  path: 'posts',
  version: APP_VERSION,
})
@ApiTags('Posts')
export class PostsController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param topicsService The topics service
   * @param postsService The posts service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly topicsService: TopicsService,
    private readonly postsService: PostsService,
  ) {
    this.logger.setContext(PostsController.name);
  }

  /**
   * Create a post endpoint.
   *
   * @param createPostRequest The DTO that carries data to create a post
   *
   * @returns The success response with `'Post created'` message and created `post` data.
   */
  @Post()
  @UseAccessControl(PostActions.Create, PostEntity)
  @ApiBearerAuth()
  @ApiSuccessesResponse([
    {
      response: ApiCreatedSuccessResponse,
      options: {
        model: PostResponse,
        options: { description: 'Post created' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async createPost(
    @Req() { user }: RequestWithAuthUser,
    @Body() createPostRequest: CreatePostRequest,
  ): Promise<SuccessResponse<PostResponse>> {
    this.logger.info(
      `Try to call ${PostsController.prototype.createPost.name}`,
    );

    try {
      return new SuccessResponse({
        message: 'Post created',
        data: await this.postsService.create({
          ...CreatePostRequest.toEntity(createPostRequest),
          topics: await this.topicsService.findByIds(
            createPostRequest.topicIds,
          ),
          author: user,
        }),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Get all posts endpoint.
   *
   * @returns The success response with `'Posts retrieved'` message and `posts` data.
   */
  @Get()
  @UseAccessControl(PostActions.ReadAll, PostEntity)
  @ApiBearerAuth()
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        model: PostResponse,
        isArray: true,
        options: { description: 'Posts retrieved' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
  ])
  async findAllPosts(): Promise<SuccessResponse<PostResponse[]>> {
    this.logger.info(
      `Try to call ${PostsController.prototype.findAllPosts.name}`,
    );

    try {
      return new SuccessResponse({
        message: 'Posts retrieved',
        data: await this.postsService.findAll(),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Get a post by a given id endpoint.
   *
   * @param post The specified post to get
   *
   * @returns The success response with `'Post retrieved'` message and a `post` data.
   */
  @Get(':id')
  @UseAccessControl(PostActions.ReadById, PostEntity, PostByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of post' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        model: PostResponse,
        options: { description: 'Post retrieved' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiNotFoundErrorResponse },
    { response: ApiUnprocessableEntityErrorResponse },
  ])
  async findPostById(
    @Param('id', PostByIdPipe) post: PostEntity,
  ): Promise<SuccessResponse<PostResponse>> {
    this.logger.info(
      `Try to call ${PostsController.prototype.findPostById.name}`,
    );

    return new SuccessResponse({
      message: 'Post retrieved',
      data: post,
    });
  }

  /**
   * Update a post by a given id endpoint.
   *
   * @param id The post id request parameter
   * @param updatePostRequest The DTO that carries data to update a post
   *
   * @returns The success response with `'Post updated'` message.
   */
  @Put(':id')
  @UseAccessControl(PostActions.Update, PostEntity, PostByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of post' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'Post updated' },
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
  async updatePost(
    @Param('id', PostByIdPipe) { id }: PostEntity,
    @Body() updatePostRequest: UpdatePostRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${PostsController.prototype.updatePost.name}`,
    );

    if (id !== updatePostRequest.id) {
      throw new ConflictException({ message: `Inconsistent post id` });
    }

    try {
      await this.postsService.update(
        id,
        UpdatePostRequest.toEntity(updatePostRequest),
      );

      return new SuccessResponse({
        message: 'Post updated',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Delete a post by a given id endpoint.
   *
   * @param id The post id to find
   *
   * @returns The success response with `'User deleted'` message.
   */
  @Delete(':id')
  @UseAccessControl(PostActions.Delete, PostEntity, PostByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of post' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'Post deleted' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
    { response: ApiNotFoundErrorResponse },
  ])
  async deletePost(
    @Param('id', PostByIdPipe) { id }: PostEntity,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${PostsController.prototype.deletePost.name}`,
    );

    try {
      await this.postsService.delete(id);

      return new SuccessResponse({
        message: 'Post deleted',
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Update a post's topics by a given id endpoint.
   *
   * @param id The post id request parameter
   * @param updatePostTopicsRequest The DTO that carries data to update a user's topics
   *
   * @returns The success response with `'User updated'` message.
   */
  @Put(':id/topics')
  @UseAccessControl(PostActions.UpdateTopics, PostEntity, PostByIdHook)
  @ApiBearerAuth()
  @ApiUuidParam({ name: 'id', description: 'The id of post' })
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'Post topics updated' },
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
  async updatePostTopics(
    @Param('id', PostByIdPipe) { id }: PostEntity,
    @Body() updatePostTopicsRequest: UpdatePostTopicsRequest,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${PostsController.prototype.updatePostTopics.name}`,
    );

    if (id !== updatePostTopicsRequest.id) {
      throw new ConflictException({ message: `Inconsistent post id` });
    }

    try {
      await this.postsService.updateTopics(
        id,
        await this.topicsService.findByIds(updatePostTopicsRequest.topicIds),
      );

      return new SuccessResponse({
        message: `Post topics updated`,
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
