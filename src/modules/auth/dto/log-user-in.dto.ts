import {
    MaxLength,
    MinLength,
    IsNotEmpty,
    IsString,
    IsEmail,

} from 'class-validator';

export class LogUserInDto {
    @MaxLength(320)
    @MinLength(5)
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @MaxLength(30)
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
