import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';

export class CreatePostDto {
  @ApiProperty({
    description: "Post's image",
    example: 'https:',
    isArray: false,
    maxLength: 2048,
    minLength: 3,
    name: 'image',
    required: false,
    type: String,
  })
  @MaxLength(2048, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2048,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 3,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: "Post's video",
    example: 'https:',
    isArray: false,
    maxLength: 2048,
    minLength: 3,
    name: 'video',
    required: false,
    type: String,
  })
  @MaxLength(2048, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2048,
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      min: 3,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  video?: string;

  @ApiProperty({
    description: "Post's text",
    example: 'some string',
    isArray: false,
    maxLength: 2200,
    name: 'text',
    required: false,
    type: String,
  })
  @MaxLength(2200, {
    message: i18nValidationMessage<I18nTranslations>('validation.minLength', {
      max: 2200,
    }),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsOptional()
  text?: string;
}
