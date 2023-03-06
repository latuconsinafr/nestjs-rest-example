import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { postsData } from '../../../../database/data/posts.data';

/**
 * Defines the DTO that carries the post identifier request parameter.
 */
export class PostIdParam {
  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({
    description: 'The id of post',
    format: 'uuid',
    example: postsData[0].id,
  })
  id: string;
}
