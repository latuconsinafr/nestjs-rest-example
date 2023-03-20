import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { usersData } from '../../../../../database/data/users.data';
import { User } from '../../../entities/user.entity';
import { IsEmailUnique } from '../../../validators/is-email-unique-validator';
import { IsPhoneNumberUnique } from '../../../validators/is-phone-number-unique.validator';
import { IsUsernameUnique } from '../../../validators/is-username-unique.validator';
import { UserIdParam } from '../../params/users/user-id.param';
import { CreateUserRequest } from './create-user-request.dto';

/**
 * Defines the DTO that carries data to update a user.
 *
 * @usageNotes
 * This DTO intersect {@link UserIdParam} with {@link CreateUserRequest} with omitted `password` and `profile` attribute.
 */
export class UpdateUserRequest extends IntersectionType(
  UserIdParam,
  OmitType(CreateUserRequest, ['password', 'profile'] as const),
) {
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  @IsUsernameUnique('id')
  @ApiProperty({
    description: 'The username of user',
    example: usersData[0].username,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsEmailUnique('id')
  @ApiProperty({
    description: 'The email of user',
    example: usersData[0].email,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('ID')
  @IsPhoneNumberUnique('id')
  @ApiProperty({
    description: 'The phone number of user',
    example: usersData[0].phone,
  })
  phone: string;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `User` entity
   */
  static toEntity(request: UpdateUserRequest): User {
    return new User(request);
  }
}
