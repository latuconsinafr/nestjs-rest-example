import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 * Defines the DTO that carries the user identifier request parameter.
 */
export class UserIdParam {
  @IsNotEmpty()
  @IsNumber()
  @Type(/* istanbul ignore next */ () => Number)
  id: number;
}
