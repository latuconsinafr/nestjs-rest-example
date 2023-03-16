import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { topicsData } from '../../../../database/data/topics.data';

/**
 * Defines the DTO that carries the topic identifier request parameter.
 */
export class TopicIdParam {
  @IsNotEmpty()
  @IsUUID('4')
  // TODO : IsTopicExistById validation
  //   @IsRoleExistById()
  @ApiProperty({
    description: 'The id of topic',
    format: 'uuid',
    example: topicsData[0].id,
  })
  id: string;
}
