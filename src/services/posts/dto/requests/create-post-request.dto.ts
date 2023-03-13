import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { postsData } from '../../../../database/data/posts.data';
import { Post } from '../../entities/post.entity';

/**
 * Defines the DTO that carries data to create a post.
 *
 * @usageNotes
 * The CreatePostRequest contains post attribute:
 * - `content`: The content of post
 * - `category`: The category of post
 */
export class CreatePostRequest {
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
