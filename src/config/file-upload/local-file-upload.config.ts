import * as fs from 'fs';
import { registerAs } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { isEnvValid } from '../../common/utils/validators/is-env-valid.validator.util';

/**
 * Defines class to hold local-file-upload-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class LocalFileUploadEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  LOCAL_FILE_UPLOAD_DEST: string;
}

/**
 * Defines the local file upload configuration.
 * This configuration is registered under `local-file-upload` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const localFileUploadConfig = registerAs(
  'local-file-upload',
  (): MulterOptions => {
    const env: LocalFileUploadEnvironmentVariables = isEnvValid(
      process.env,
      LocalFileUploadEnvironmentVariables,
    );

    // * Create the local file upload destination if it doesn't exist
    if (!fs.existsSync(env.LOCAL_FILE_UPLOAD_DEST)) {
      fs.mkdirSync(env.LOCAL_FILE_UPLOAD_DEST);
    }

    return {
      dest: env.LOCAL_FILE_UPLOAD_DEST,
    };
  },
);
