import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { usersData } from '../../../../../database/data/users.data';

/**
 * Defines the DTO that carries the user identifier request parameter.
 */
export class UserIdParam {
  @IsNotEmpty()
  @IsNumber()
  @Type(/* istanbul ignore next */ () => Number)
  @ApiProperty({
    description: 'The id of user',
    example: usersData[0].id,
  })
  id: number;
}
