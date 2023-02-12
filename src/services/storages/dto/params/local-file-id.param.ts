import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { localFilesData } from '../../../../database/data/local-files.data';

/**
 * Defines the DTO that carries the local file identifier request parameter.
 */
export class LocalFileIdParam {
  @IsNotEmpty()
  @IsNumber()
  @Type(/* istanbul ignore next */ () => Number)
  @ApiProperty({
    description: 'The id of local file',
    example: localFilesData[0].id,
  })
  id: number;
}
