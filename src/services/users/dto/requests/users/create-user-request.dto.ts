import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { usersData } from '../../../../../database/data/users.data';
import { User } from '../../../entities/user.entity';
import { UserRole } from '../../../enums/user-role.enum';
import { IsEmailUnique } from '../../../validators/is-email-unique-validator';
import { IsPhoneNumberUnique } from '../../../validators/is-phone-number-unique.validator';
import { IsUsernameUnique } from '../../../validators/is-username-unique.validator';
import { CreateUserProfileRequest } from '../user-profiles/create-user-profile-request.dto';

/**
 * Defines the DTO that carries data to create a user.
 *
 * @usageNotes
 * The CreateUserRequest contains user attribute:
 * - `username`: The username of user
 * - `email`: The email of user
 * - `phone`: The phone of user
 * - `password`: The password of user
 * - `roles`: The roles of user
 * - `profile`: The user profile
 */
export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @Length(4, 12)
  @IsUsernameUnique()
  @ApiProperty({
    description: 'The username of user',
    example: usersData[0].username,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsEmailUnique()
  @ApiProperty({
    description: 'The email of user',
    example: usersData[0].email,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('ID')
  @IsPhoneNumberUnique()
  @ApiProperty({
    description: 'The phone number of user',
    example: usersData[0].phone,
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  @ApiProperty({
    description: 'The password of user',
    example: 'password',
  })
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(UserRole, { each: true })
  @ApiProperty({
    description: 'The roles of user',
    enum: UserRole,
    isArray: true,
    examples: [UserRole.SuperAdmin],
  })
  roles: UserRole[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => CreateUserProfileRequest) // * ValidateNested() for object should use this type of transformation
  @ApiProperty({
    description: 'The profile of user',
    type: CreateUserProfileRequest,
  })
  profile: CreateUserProfileRequest;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `User` entity
   */
  static toEntity(request: CreateUserRequest): User {
    const { profile, ...user } = request;

    return new User({
      ...user,
      profile: CreateUserProfileRequest.toEntity(profile),
    });
  }
}
