import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiConsumes } from '@nestjs/swagger';
import { LocalFileInterceptor } from '../../../services/storages/interceptors/local-file-interceptor';

/**
 * Decorators that combine {@link UseInterceptors} of {@link LocalFileInterceptor} and {@link ApiConsumes} to set the `multipart/form-data`
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param fieldName The field name of file
 * @param localOptions The multer options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiFile = (
  fieldName = 'file',
  localOptions?: MulterOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  return applyDecorators(
    UseInterceptors(LocalFileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
  );
};
