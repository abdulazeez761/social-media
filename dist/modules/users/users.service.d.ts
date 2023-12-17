import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CacheService } from 'core/lib/cache/cache.service';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
export declare class UsersService {
    private readonly cacheService;
    private readonly i18nService;
    constructor(cacheService: CacheService, i18nService: I18nService<I18nTranslations>);
    users: User[];
    createUserForAuth(createUserDto: CreateUserDto): User;
    findUserByEmail(email: string): User | undefined;
    create(createUserDto: CreateUserDto): Promise<{
        httpStatus: HttpStatus;
        message: string;
        data: User;
    }>;
    findAll(): {
        httpStatus: HttpStatus;
        message: string;
        data: User[];
    };
    findOne(id: number): {
        data: User;
        message: string;
        httpStatus: HttpStatus;
    };
    update(id: number, updateUserDto: UpdateUserDto): {
        data: User | undefined;
        message: string;
        httpStatus: HttpStatus;
    };
    remove(id: number): {
        data: {
            data: User;
            message: string;
            httpStatus: HttpStatus;
        };
        message: string;
        httpStatus: HttpStatus;
    };
}
