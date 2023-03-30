import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessService } from 'nest-casl';
import { PinoLogger } from 'nestjs-pino';
import { SuccessResponse } from '../../../common/dto/responses/success-response.dto';
import { ConflictException } from '../../../common/exceptions/conflict.exception';
import { InternalServerErrorException } from '../../../common/exceptions/internal-server-error.exception';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { postsData } from '../../../database/data/posts.data';
import { topicsData } from '../../../database/data/topics.data';
import { usersData } from '../../../database/data/users.data';
import RequestWithAuthUser from '../../auth/interface/request-with-auth-user.interface';
import { Topic } from '../../topics/entities/topic.entity';
import { TopicsService } from '../../topics/topics.service';
import { CreatePostRequest } from '../dto/requests/create-post-request.dto';
import { UpdatePostRequest } from '../dto/requests/update-post-request.dto';
import { UpdatePostTopicsRequest } from '../dto/requests/update-post-topics-request.dto';
import { Post } from '../entities/post.entity';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';

describe(PostsController.name, () => {
  let postsController: PostsController;
  let topicsService: TopicsService;
  let postsService: PostsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        TopicsService,
        { provide: getRepositoryToken(Topic), useValue: mockedRepository },
        PostsService,
        { provide: getRepositoryToken(Post), useValue: mockedRepository },
        {
          provide: AccessService,
          useValue: {},
        },
      ],
    }).compile();

    topicsService = moduleRef.get<TopicsService>(TopicsService);
    postsService = moduleRef.get<PostsService>(PostsService);
    postsController = moduleRef.get<PostsController>(PostsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${PostsController.prototype.createPost.name} is called`, () => {
    let request: RequestWithAuthUser;
    let postToCreate: CreatePostRequest;
    let postsServiceCreateSpy: jest.SpyInstance<Promise<Post>, [post: Post]>;

    beforeEach(() => {
      request = { ...request, user: usersData[0] };
      postToCreate = {
        ...postsData[0],
      };
      postsServiceCreateSpy = jest.spyOn(postsService, 'create');
      postsServiceCreateSpy.mockResolvedValue(postsData[0]);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(postsService, 'create').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(
          postsController.createPost(request, postToCreate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${PostsService.name} ${PostsService.prototype.create.name} method`, async () => {
        await postsController.createPost(request, postToCreate);

        expect(postsServiceCreateSpy).toBeCalledTimes(1);
      });

      it('should return a message and data contains the created post', async () => {
        expect(
          await postsController.createPost(request, postToCreate),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'Post created',
            data: postsData[0],
          }),
        );
      });
    });
  });

  describe(`when ${PostsController.prototype.findAllPosts.name} is called`, () => {
    let postsServiceFindAllSpy: jest.SpyInstance<Promise<Post[]>, []>;

    beforeEach(() => {
      postsServiceFindAllSpy = jest.spyOn(postsService, 'findAll');
      postsServiceFindAllSpy.mockResolvedValue([...postsData]);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(postsService, 'findAll').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(postsController.findAllPosts()).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${PostsService.name} ${PostsService.prototype.findAll.name} method`, async () => {
        await postsController.findAllPosts();

        expect(postsServiceFindAllSpy).toBeCalledTimes(1);
      });

      it(`should return a message and data contains array of posts`, async () => {
        expect(await postsController.findAllPosts()).toStrictEqual(
          new SuccessResponse({
            message: 'Posts retrieved',
            data: postsData,
          }),
        );
      });
    });
  });

  describe(`when ${PostsController.prototype.findPostById.name} is called`, () => {
    it(`should return a message and data contains a post`, async () => {
      expect(await postsController.findPostById(postsData[0])).toStrictEqual(
        new SuccessResponse({
          message: 'Post retrieved',
          data: postsData[0],
        }),
      );
    });
  });

  describe(`when ${PostsController.prototype.updatePost.name} is called`, () => {
    let postToUpdate: UpdatePostRequest;
    let postsServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, post: Post]
    >;

    beforeEach(() => {
      postToUpdate = { ...postsData[0] };
      postsServiceUpdateSpy = jest.spyOn(postsService, 'update');
      postsServiceUpdateSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          postsController.updatePost(
            {
              ...postsData[1],
            },
            postToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(postsService, 'update').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(
          postsController.updatePost(postsData[0], postToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${PostsService.name} ${PostsService.prototype.update.name} method`, async () => {
        await postsController.updatePost(postsData[0], postToUpdate);

        expect(postsServiceUpdateSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await postsController.updatePost(postsData[0], postToUpdate),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'Post updated',
          }),
        );
      });
    });
  });

  describe(`when ${PostsController.prototype.deletePost.name} is called`, () => {
    let postsServiceDeleteSpy: jest.SpyInstance<Promise<boolean>, [id: string]>;

    beforeEach(() => {
      postsServiceDeleteSpy = jest.spyOn(postsService, 'delete');
      postsServiceDeleteSpy.mockResolvedValue(true);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(postsService, 'delete').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(postsController.deletePost(postsData[0])).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${PostsService.name} ${PostsService.prototype.delete.name} method`, async () => {
        await postsController.deletePost(postsData[0]);

        expect(postsServiceDeleteSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(await postsController.deletePost(postsData[0])).toStrictEqual(
          new SuccessResponse({
            message: 'Post deleted',
          }),
        );
      });
    });
  });

  describe(`when ${PostsController.prototype.updatePostTopics.name} is called`, () => {
    let postTopicsToUpdate: UpdatePostTopicsRequest;
    let topicsServiceFindByIdsSpy: jest.SpyInstance<
      Promise<Topic[]>,
      [ids: string[]]
    >;
    let postsServiceUpdateTopicsSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, topic: Topic[]]
    >;

    beforeEach(() => {
      postTopicsToUpdate = { ...postsData[0] };
      topicsServiceFindByIdsSpy = jest.spyOn(topicsService, 'findByIds');
      topicsServiceFindByIdsSpy.mockResolvedValue([...topicsData]);
      postsServiceUpdateTopicsSpy = jest.spyOn(postsService, 'updateTopics');
      postsServiceUpdateTopicsSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          postsController.updatePostTopics(
            {
              ...postsData[1],
            },
            postTopicsToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest
          .spyOn(postsService, 'updateTopics')
          .mockImplementationOnce(async () => {
            throw new Error();
          });

        await expect(
          postsController.updatePostTopics(postsData[0], postTopicsToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${TopicsService.name} ${TopicsService.prototype.findByIds.name} method`, async () => {
        await postsController.updatePostTopics(
          postsData[0],
          postTopicsToUpdate,
        );

        expect(topicsServiceFindByIdsSpy).toBeCalledTimes(1);
      });

      it(`should call ${PostsService.name} ${PostsService.prototype.update.name} method`, async () => {
        await postsController.updatePostTopics(
          postsData[0],
          postTopicsToUpdate,
        );

        expect(postsServiceUpdateTopicsSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await postsController.updatePostTopics(
            postsData[0],
            postTopicsToUpdate,
          ),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'Post topics updated',
          }),
        );
      });
    });
  });
});
