import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../../common/utils/mocks/typeorm/repository.mock';
import { Post } from '../../../entities/post.entity';
import { PostByIdHook } from '../../../permissions/hooks/post-by-id.hook';
import { PostsService } from '../../../posts.service';
import { Request } from 'nest-casl';
import { postsData } from '../../../../../database/data/posts.data';

describe(PostByIdHook.name, () => {
  let postByIdHook: PostByIdHook;
  let postsService: PostsService;
  let request: Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PostByIdHook,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        PostsService,
        { provide: getRepositoryToken(Post), useValue: mockedRepository },
      ],
    }).compile();

    postByIdHook = moduleRef.get<PostByIdHook>(PostByIdHook);
    postsService = moduleRef.get<PostsService>(PostsService);

    request = {
      casl: {} as any,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${PostByIdHook.prototype.run.name} is called`, () => {
    describe('and the post is not found', () => {
      it(`should return undefined`, async () => {
        jest.spyOn(postsService, 'findById').mockResolvedValue(null);

        expect(
          await postByIdHook.run({ ...request, params: postsData[0].id }),
        ).toBeUndefined();
      });
    });

    describe('and the post is found', () => {
      it(`should return the post`, async () => {
        jest.spyOn(postsService, 'findById').mockResolvedValue(postsData[0]);

        expect(
          await postByIdHook.run({ ...request, params: postsData[0].id }),
        ).toStrictEqual(postsData[0]);
      });
    });
  });
});
