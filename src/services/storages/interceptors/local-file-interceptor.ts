import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

/**
 * Defines file interceptor that extend the default {@link FileInterceptor} in a mixin pattern.
 *
 * This interceptor is going to load the multer options from the configuration
 * and override the loaded configuration with the supplied {@link localOptions}, if any.
 *
 * @see [Interceptors](https://docs.nestjs.com/interceptors)
 * @see [File Interceptor](https://docs.nestjs.com/techniques/file-upload#default-options)
 *
 * @param fieldName The field name which contains the file
 * @param localOptions The multer options
 *
 * @returns NestInterceptor
 */
export function LocalFileInterceptor(
  fieldName: string,
  localOptions?: MulterOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor(configService: ConfigService) {
      const defaultMulterOptions =
        configService.get<MulterOptions>('local-file-upload');

      this.fileInterceptor = new (FileInterceptor(fieldName, {
        ...defaultMulterOptions,
        ...localOptions,
        dest:
          defaultMulterOptions?.dest + `${localOptions?.dest}` ??
          localOptions?.dest,
      }))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}
