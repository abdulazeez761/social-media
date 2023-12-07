import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LogUserInDto } from './dto/log-user-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    loginUserIn(logUserInDto: LogUserInDto): Promise<any>;
    logUserOut(id: number): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
