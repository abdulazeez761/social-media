import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { CacheService } from 'core/lib/cache/cache.service';
// import { Field } from 'src/core/lib/cache/types/field.type';
@Injectable()
export class UsersService {
  constructor(
    private readonly cacheService: CacheService
  ) { }

  users: User[] = [];
  createuserForAuth(createUserDto:CreateUserDto) {
    const { email } = createUserDto
    const user = this.findUserByEmail(email)
    if (user) throw new HttpException('user already exist!', HttpStatus.CONFLICT);
    let length = this.users.length;
    const createdUser = new User({
      ...createUserDto,
      id: ++length
      
    });
    this.users.push(createdUser);
  }

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    let length = this.users.length;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...createUserDto,
      id: ++length,
      password: hashedPassword,
    });
    this.users.push(user);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created User Successfully',
    };
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    user?.updateOne(updateUserDto);
    return {
      data: user,
      message: 'Updated User Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  remove(id: number) {
    const user = this.findOne(id)
    let userID = user.id + '';
    this.users = this.users.filter((user) => user.id !== id);
  //  return this.cacheService.getField(userID, 'userID');
    this.cacheService.deleteUserFromCache(userID)
    return {
      data: user,
      message: 'Deleted User Successfully!',
      statusCode: HttpStatus.OK,
    };

  }


}
