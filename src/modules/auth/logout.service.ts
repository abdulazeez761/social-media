import { HttpStatus, Injectable } from '@nestjs/common';
import { CacheService } from 'core/lib/cache/cache.service';
import { User } from 'modules/users/entities/user.entity';
import { UsersService } from 'modules/users/users.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';

@Injectable()
export class LogoutService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UsersService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  async logUserOut(id: number): Promise<ResponseFromServiceI<User>> {
    await this.cacheService.deleteField(id + '', 'accessToken');
    const logedOutUser = this.userService.findOne(id).data;
    return {
      message: this.i18nService.t('shared.success.logout'),
      httpStatus: HttpStatus.OK,
      data: logedOutUser,
    };
  }
}
