import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 * Defines the DTO that carries the user identifier request parameter.
 */
export class UserIdParam {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
