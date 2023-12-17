import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'core/lib/cache/cache.service';
import { UsersService } from 'modules/users/users.service';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { LogUserInDto } from './dto/log-user-in.dto';
export declare class LoginService {
    private readonly usersService;
    private readonly jwtService;
    private readonly cacheService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, cacheService: CacheService, configService: ConfigService);
    logUserIn(logUserInDto: LogUserInDto): Promise<ResponseFromServiceI<string>>;
}
