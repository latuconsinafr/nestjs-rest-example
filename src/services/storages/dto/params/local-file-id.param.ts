import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { localFilesData } from '../../../../database/data/local-files.data';
import { IsLocalFileExist } from '../../validators/is-local-file-exist.validator';

/**
 * Defines the DTO that carries the local file identifier request parameter.
 */
export class LocalFileIdParam {
  @IsNotEmpty()
  @IsString()
  @IsLocalFileExist()
  @ApiProperty({
    description: 'The id of local file',
    format: 'uuid',
    example: localFilesData[0].id,
  })
  id: string;
}
