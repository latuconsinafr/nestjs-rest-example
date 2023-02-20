import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { usersData } from '../../../../../database/data/users.data';
import { IsUserExist } from '../../../validators/is-user-exist.validator';

/**
 * Defines the DTO that carries the user identifier request parameter.
 */
export class UserIdParam {
  @IsNotEmpty()
  @IsUUID('4')
  @IsUserExist()
  @ApiProperty({
    description: 'The id of user',
    example: usersData[0].id,
  })
  id: string;
}
