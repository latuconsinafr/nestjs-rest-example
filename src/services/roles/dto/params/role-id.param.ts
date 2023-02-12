import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { rolesData } from '../../../../database/data/roles.data';

/**
 * Defines the DTO that carries the role identifier request parameter.
 */
export class RoleIdParam {
  @IsNotEmpty()
  @IsNumber()
  @Type(/* istanbul ignore next */ () => Number)
  @ApiProperty({
    description: 'The id of role',
    example: rolesData[0].id,
  })
  id: number;
}
