import { CacheService } from 'core/lib/cache/cache.service';
import { User } from 'modules/users/entities/user.entity';
import { UsersService } from 'modules/users/users.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
export declare class LogoutService {
    private readonly cacheService;
    private readonly userService;
    private readonly i18nService;
    constructor(cacheService: CacheService, userService: UsersService, i18nService: I18nService<I18nTranslations>);
    logUserOut(id: number): Promise<ResponseFromServiceI<User>>;
}
