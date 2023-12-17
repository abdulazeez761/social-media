import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Allow, IsEmail, IsString } from 'class-validator';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsISO8601,
} from 'class-validator';
import { IsContainsLowercase } from 'core/decorator/is-contains-lower-case.decorator';
import { IsContainsSpecialChar } from 'core/decorator/is-contains-special-cars-case.decorator';
import { IsContainsUpperCase } from 'core/decorator/is-contains-upper-case.decorator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { Gender } from 'shared/enums/gender.enum';
export class CreateUserDto {
  @Allow()
  id!: number;

  @ApiProperty({
    description: "User's username",
    example: 'mut1aq',
    isArray: false,
    maxLength: 30,
    minLength: 3,
    name: 'username',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  username!: string;

  @ApiProperty({
    description: "User's email",
    example: 'abdulaziz@gmail.com',
    isArray: false,
    maxLength: 320,
    minLength: 5,
    name: 'email',
    required: true,
    type: String,
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail(undefined, {
    message: i18nValidationMessage<I18nTranslations>('validation.email'),
  })
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: "User's password",
    example: 'abdulaziz26!2003',
    isArray: false,
    maxLength: 30,
    minLength: 8,
    name: 'password',
    required: true,
    type: String,
  })
  @MaxLength(30)
  @MinLength(8)
  @IsString()
  @IsContainsLowercase({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.passwordContains.lowercase',
    ),
  })
  @IsContainsUpperCase({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.passwordContains.uppercase',
    ),
  })
  @IsContainsSpecialChar({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.passwordContains.specialCharacter',
    ),
  })
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    description: "User's password",
    example: 'mut1aq.54321',
    isArray: false,
    maxLength: 30,
    minLength: 8,
    name: 'password',
    required: true,
    type: Number,
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Gender must be a number' },
  )
  @IsNotEmpty()
  gender!: Gender;

  @IsISO8601()
  @IsNotEmpty()
  birthday!: string;

  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  city?: string;
}
