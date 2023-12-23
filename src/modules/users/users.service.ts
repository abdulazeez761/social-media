import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CacheService } from 'core/lib/cache/cache.service';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Not, Repository } from 'typeorm';
import { FilterUsersDto } from './dto/filter-users.dto';
import { DynamicObjectI } from 'shared/interfaces/general/dynamic-object.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUserForAuth(createUserDto: CreateUserDto) {
    // exception for
    // const { email } = createUserDto;

    // const user = await this.findUserByEmail(email);

    // if (!!user)
    //   throw new HttpException(
    //     'Email already exists, please choose another one',
    //     HttpStatus.CONFLICT,
    //   );

    const createdUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(createdUser);

    return createdUser;
  }

  async findAll(
    filterUsersDto: FilterUsersDto,
  ): Promise<ResponseFromServiceI<User[]>> {
    const { take, skip, email, username } = filterUsersDto;
    const filterObject: DynamicObjectI = {};

    !email
      ? (filterObject['email'] = Not(IsNull()))
      : (filterObject['email'] = ILike(`%${email}%`));

    !username
      ? (filterObject['username'] = Not(IsNull()))
      : (filterObject['username'] = ILike(`%${username}%`));

    const users = await this.usersRepository.find({
      select: ['id', 'username', 'city', 'gender', 'email', '__V'],
      where: [filterObject],
      take,
      skip,
    });
    return {
      data: users,
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.findAll',
        args: { entity: 'entities.user' },
      },
    };
  }

  async findOne(id: string): Promise<ResponseFromServiceI<User>> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return {
      data: user,
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.findOne',
        args: { entity: 'entities.user' },
      },
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseFromServiceI<User>> {
    const updateResult = await this.usersRepository.update(
      { id },
      updateUserDto,
    );

    if (!updateResult.affected)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return {
      data: updateResult.raw,
      message: {
        translationKey: 'shared.success.update',
        args: { entity: 'entities.user' },
      },
      httpStatus: HttpStatus.OK,
    };
  }

  async remove(id: string): Promise<ResponseFromServiceI<User>> {
    const deleteResult = await this.usersRepository.delete({ id });
    if (!deleteResult.affected)
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);

    this.cacheService.del(id + '');
    return {
      data: deleteResult.raw,
      message: {
        translationKey: 'shared.success.delete',
        args: { entity: 'entities.user' },
      },
      httpStatus: HttpStatus.OK,
    };
  }

  findUserByEmail(email: string) {
    const user = this.usersRepository.findOneBy({ email });
    return user;
  }
}
