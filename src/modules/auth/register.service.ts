import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { User } from 'modules/users/entities/user.entity';
import { UsersService } from 'modules/users/users.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<ResponseFromServiceI<User>> {
    const salt = await bcrypt.genSalt(10);
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, salt);
    createUserDto.password = hashedPassword;

    const createdUser = this.usersService.createUserForAuth(createUserDto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: this.i18n.t('shared.success.create', {
        args: { entity: this.i18n.t('entities.user') },
      }),
      data: createdUser,
    };
  }
}
