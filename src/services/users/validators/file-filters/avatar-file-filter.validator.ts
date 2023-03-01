import { UnprocessableEntityException } from '@nestjs/common';

/**
 * Defines file filter callback for avatar file.
 */
export default (
  req: any,
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  },
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (!file.mimetype.includes('image')) {
    return callback(
      new UnprocessableEntityException({
        message: [
          {
            property: file.fieldname,
            constraints: [`${file.fieldname} mimetype is not a valid image`],
          },
        ],
      }),
      false,
    );
  }
  callback(null, true);
};
