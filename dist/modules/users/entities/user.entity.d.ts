import { Gender } from 'shared/enums/gender.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    gender: Gender;
    birthday: string;
    city: string;
    constructor(createUserDto: CreateUserDto);
    updateOne(updateUserDto: UpdateUserDto): void;
}
