import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString,  MaxLength} from 'class-validator';

export class CreateCommentDto {
    id!: number;

    @IsNotEmpty()
    @MaxLength(2200)
    @IsString()
    text!: string;

    @IsNumber()
    @IsNotEmpty()
    author!: number;

    @IsOptional()
    @IsPositive()
    replyToComment!: number;
}
