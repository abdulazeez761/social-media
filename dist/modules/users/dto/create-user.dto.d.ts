import { Gender } from 'shared/enums/gender.enum';
export declare class CreateUserDto {
    id: number;
    username: string;
    email: string;
    password: string;
    gender: Gender;
    birthday: string;
    city: string;
}
