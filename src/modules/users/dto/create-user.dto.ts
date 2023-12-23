import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail, IsString } from 'class-validator';
import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsISO8601,
} from 'class-validator';
import { IsContainsLowercase } from 'core/decorators/is-contains-lower-case.decorator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { Gender } from 'shared/enums/gender.enum';

export class CreateUserDto {
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
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 3,
    }),
  })
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
  @MaxLength(320, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 320,
    }),
  })
  @MinLength(5, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 5,
    }),
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage<I18nTranslations>('validation.email'),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  email!: string;

  @ApiProperty({
    description: "User's password",
    example: 'abdulaziz',
    isArray: false,
    maxLength: 30,
    minLength: 8,
    name: 'password',
    required: true,
    type: String,
  })
  @MaxLength(30, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 30,
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 8,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsContainsLowercase({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.passwordContains.lowercase',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  password!: string;

  @ApiProperty({
    description: "User's password",
    example: 'Abdulaziz@1',
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
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  gender!: Gender;

  @IsISO8601()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  birthday!: string;

  @MaxLength(100, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 100,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 3,
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  city?: string;
}
