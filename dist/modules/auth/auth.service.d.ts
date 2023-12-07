import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { LogUserInDto } from './dto/log-user-in.dto';
import { CacheService } from 'src/core/lib/cache/cache.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly cacheService;
    constructor(userService: UsersService, jwtService: JwtService, cacheService: CacheService);
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    logUserIn(logUserInDto: LogUserInDto): Promise<any>;
    logUserOut(id: number): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
}
