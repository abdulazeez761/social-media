import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { LogUserInDto } from './dto/log-user-in.dto';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { LogoutService } from './logout.service';
export declare class AuthController {
    private readonly loginService;
    private readonly registerService;
    private readonly logoutServiec;
    constructor(loginService: LoginService, registerService: RegisterService, logoutServiec: LogoutService);
    registerUser(createUserDto: CreateUserDto): Promise<import("../../shared/interfaces/general/response-from-service.interface").ResponseFromServiceI<import("../users/entities/user.entity").User>>;
    logUserIn(logUserInDto: LogUserInDto): Promise<import("../../shared/interfaces/general/response-from-service.interface").ResponseFromServiceI<string>>;
    logUserOut(userID: number): Promise<import("../../shared/interfaces/general/response-from-service.interface").ResponseFromServiceI<import("../users/entities/user.entity").User>>;
}
