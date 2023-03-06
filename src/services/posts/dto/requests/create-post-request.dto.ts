import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { postsData } from '../../../../database/data/posts.data';
import { usersData } from '../../../../database/data/users.data';
import { IsUserExist } from '../../../users/validators/is-user-exist.validator';
import { Post } from '../../entities/post.entity';

export class CreatePostRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  @ApiProperty({
    description: 'The title of post',
    example: postsData[0].title,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 250)
  @ApiProperty({
    description: 'The content of post',
    example: postsData[0].content,
  })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The category of post',
    example: postsData[0].category,
  })
  category: string;

  @IsNotEmpty()
  @IsUUID('4')
  @IsUserExist()
  @ApiProperty({
    description: 'The author id of post',
    format: 'uuid',
    example: usersData[0].id,
  })
  authorId: string;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `Post` entity
   */
  static toEntity(request: CreatePostRequest): Post {
    return new Post({
      ...request,
    });
  }
}
