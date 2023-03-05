import { UnprocessableEntityException } from '../../../../../common/exceptions/unprocessable-entity.exception';
import avatarFileFilterValidator from '../../../validators/file-filters/avatar-file-filter.validator';

describe(avatarFileFilterValidator.name, () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const callback: (error: Error | null, acceptFile: boolean) => void = () => {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${avatarFileFilterValidator.name} is called`, () => {
    const file = {
      fieldname: 'avatar',
      mimetype: 'file/pdf',
    } as any;

    describe('and the mimetype is not includes "image"', () => {
      beforeEach(() => {
        file.mimetype = 'file/pdf';
      });

      it(`should throw the callback with ${UnprocessableEntityException.name} exception and false value`, () => {
        expect(avatarFileFilterValidator({}, file, callback)).toBe(
          callback(
            new UnprocessableEntityException({
              message: [
                {
                  property: file.fieldname,
                  constraints: [
                    `${file.fieldname} mimetype is not a valid image`,
                  ],
                },
              ],
            }),
            false,
          ),
        );
      });
    });

    describe('and the mimetype is includes "image"', () => {
      beforeEach(() => {
        file.mimetype = 'image/png';
      });

      it(`should throw the callback with null and true value`, () => {
        expect(avatarFileFilterValidator({}, file, callback)).toBe(
          callback(null, true),
        );
      });
    });
  });
});
