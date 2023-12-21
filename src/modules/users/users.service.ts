import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { CacheService } from 'core/lib/cache/cache.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
// import { Field } from 'src/core/lib/cache/types/field.type';
@Injectable()
export class UsersService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  users: User[] = [];

  createUserForAuth(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = this.findUserByEmail(email);
    if (user)
      throw new HttpException(
        this.i18nService.translate('shared.errors.userAlreadyExist', {
          args: {
            entity: this.i18nService.translate('entities.user'),
          },
        }),
        HttpStatus.CONFLICT,
      );
    let length = this.users.length;

    const createdUser = new User({
      ...createUserDto,
      id: ++length,
    });
    this.users.push(createdUser);
    return createdUser;
  }

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    let length = this.users.length;
    const hashedPassword = await bcrypt.hash(password, 10);

    const foundedUser = this.findUserByEmail(email);
    if (foundedUser)
      throw new HttpException(
        this.i18nService.translate('shared.errors.userAlreadyExist', {
          args: {
            entity: this.i18nService.translate('entities.user'),
          },
        }),
        HttpStatus.CONFLICT,
      );

    const user = new User({
      ...createUserDto,
      id: ++length,
      password: hashedPassword,
    });
    this.users.push(user);

    return {
      httpStatus: HttpStatus.CREATED,
      message: this.i18nService.translate('shared.success.create'),
      data: user,
    };
  }

  findAll() {
    return {
      httpStatus: HttpStatus.OK,
      message: this.i18nService.translate('shared.success.approve'),
      data: this.users,
    };
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user)
      throw new HttpException(
        this.i18nService.translate('shared.errors.userAlreadyExist', {
          args: {
            entity: this.i18nService.translate('entities.user'),
          },
        }),
        HttpStatus.CONFLICT,
      );

    return {
      data: user,
      message: this.i18nService.translate('shared.success.approve'),
      httpStatus: HttpStatus.OK,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    user?.updateOne(updateUserDto);
    return {
      data: user,
      message: this.i18nService.translate('shared.errors.update', {
        args: {
          entity: this.i18nService.translate('entities.user'),
        },
      }),
      httpStatus: HttpStatus.OK,
    };
  }

  remove(id: number) {
    const user = this.findOne(id);
    let userID = user.data.id + '';
    this.users = this.users.filter((user) => user.id !== id);
    this.cacheService.deleteUserFromCache(userID);
    return {
      data: user,
      message: this.i18nService.translate('shared.success.delete', {
        args: {
          entity: this.i18nService.translate('entities.user'),
        },
      }),
      httpStatus: HttpStatus.OK,
    };
  }
}
