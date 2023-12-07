import { Gender } from 'shared/enums/gender.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class User {
  id!: number;

  username!: string;

  email!: string;

  password!: string;

  gender!: Gender;

  birthday!: string;

  city!: string;

  constructor(createUserDto: CreateUserDto) {
    Object.assign(this, createUserDto);
  }

  updateOne(updateUserDto: UpdateUserDto) {
    Object.assign(this, { ...this, ...updateUserDto });
  }
}
