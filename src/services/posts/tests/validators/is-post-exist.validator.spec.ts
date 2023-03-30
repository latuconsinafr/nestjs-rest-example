import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValidationArguments } from 'class-validator';
import { PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { postsData } from '../../../../database/data/posts.data';
import { Post } from '../../entities/post.entity';
import { PostsService } from '../../posts.service';
import { IsPostExistValidator } from '../../validators/is-post-exist.validator';

describe(IsPostExistValidator.name, () => {
  let isPostExistValidator: IsPostExistValidator;
  let postsService: PostsService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsPostExistValidator,
        PostsService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Post), useValue: mockedRepository },
      ],
    }).compile();

    isPostExistValidator =
      moduleRef.get<IsPostExistValidator>(IsPostExistValidator);
    postsService = moduleRef.get<PostsService>(PostsService);
    validationArguments = {
      property: 'id',
      value: uuidv4(),
      targetName: 'id',
      constraints: [],
      object: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${IsPostExistValidator.prototype.validate.name} is called`, () => {
    describe('and the incoming value is not a valid UUID v4', () => {
      it('should return false', async () => {
        expect(await isPostExistValidator.validate('asdasd')).toBeFalsy();
      });
    });

    describe('and the incoming value is a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the post is not found', () => {
        it('should return false', async () => {
          jest.spyOn(postsService, 'findById').mockResolvedValue(null);

          expect(await isPostExistValidator.validate(value)).toBeFalsy();
        });
      });

      describe('and the post is found', () => {
        it('should return true', async () => {
          jest.spyOn(postsService, 'findById').mockResolvedValue(postsData[0]);

          expect(await isPostExistValidator.validate(value)).toBeTruthy();
        });
      });
    });
  });

  describe(`when ${IsPostExistValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isPostExistValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `post with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`,
      );
    });
  });
});
