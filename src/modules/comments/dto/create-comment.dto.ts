import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';

export class CreateCommentDto {
  @ApiProperty({
    description: "comment's text",
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
  text!: string;
}
