import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { User } from 'modules/users/entities/user.entity';
import { UsersService } from 'modules/users/users.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
export declare class RegisterService {
    private readonly usersService;
    private readonly i18n;
    constructor(usersService: UsersService, i18n: I18nService<I18nTranslations>);
    registerUser(createUserDto: CreateUserDto): Promise<ResponseFromServiceI<User>>;
}
