import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { LogUserInDto } from './dto/log-user-in.dto';
import { LoginService } from './login.service';
import { LogoutService } from './logout.service';
import { RegisterService } from './register.service';
export declare class AuthController {
    private readonly loginService;
    private readonly registerService;
    private readonly logoutService;
    constructor(loginService: LoginService, registerService: RegisterService, logoutService: LogoutService);
    registerUser(createUserDto: CreateUserDto): any;
    logUserIn(logUserInDto: LogUserInDto): Promise<import("../../shared/interfaces/general/response-from-service.interface").ResponseFromServiceI<string>>;
    logUserOut(request: RequestI): Promise<import("../../shared/interfaces/general/response-from-service.interface").ResponseFromServiceI<import("../users/entities/user.entity").User>>;
}
