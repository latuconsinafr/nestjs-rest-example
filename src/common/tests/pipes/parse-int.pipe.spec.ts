import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UnprocessableEntityException } from '../../exceptions/unprocessable-entity.exception';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';

describe(ParseIntPipe.name, () => {
  let parseIntPipe: ParseIntPipe;
  let argumentMetaData: ArgumentMetadata;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ParseIntPipe],
    }).compile();

    parseIntPipe = moduleRef.get<ParseIntPipe>(ParseIntPipe);

    argumentMetaData = {
      type: 'param',
      metatype: Number,
      data: 'id',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${ParseIntPipe.prototype.transform.name} is called`, () => {
    describe('and the string value is unable to be parsed to int', () => {
      it(`should throw ${UnprocessableEntityException.name}`, () => {
        expect(() => {
          parseIntPipe.transform('asdsxasx', argumentMetaData);
        }).toThrow(UnprocessableEntityException);
      });
    });

    describe('and the string value is able to be parsed to int', () => {
      it(`should return the parsed int value`, () => {
        const value = '1';

        expect(parseIntPipe.transform(value, argumentMetaData)).toStrictEqual(
          parseInt(value, 10),
        );
      });
    });
  });
});
