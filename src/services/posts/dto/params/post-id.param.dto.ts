import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { postsData } from '../../../../database/data/posts.data';
import { IsPostExist } from '../../validators/is-post-exist.validator';

/**
 * Defines the DTO that carries the post identifier request parameter.
 */
export class PostIdParam {
  @IsNotEmpty()
  @IsUUID('4')
  @IsPostExist()
  @ApiProperty({
    description: 'The id of post',
    format: 'uuid',
    example: postsData[0].id,
  })
  id: string;
}
