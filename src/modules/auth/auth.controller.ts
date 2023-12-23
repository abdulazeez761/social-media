import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators';
import { Public } from 'core/decorators/public.decorator';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { ROUTES } from 'shared/constants/routes.constant';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { registerRouteApiResponse } from './constants/register-route-api-response.conatant';
import { LogUserInDto } from './dto/log-user-in.dto';
import { LoginService } from './login.service';
import { LogoutService } from './logout.service';
import { RegisterService } from './register.service';

@ApiTags(ROUTES.AUTH.CONTROLLER)
@Controller(ROUTES.AUTH.CONTROLLER)
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly logoutService: LogoutService,
  ) {}

  @Public()
  @ApiResponse(registerRouteApiResponse)
  @Post(ROUTES.AUTH.REGISTER_USER)
  registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.registerService.registerUser(createUserDto);
    } catch (error: any) {
      return error.message;
    }
  }

  @Public()
  @Post(ROUTES.AUTH.LOG_USER_IN)
  logUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.loginService.logUserIn(logUserInDto);
  }

  @Post(ROUTES.AUTH.LOG_OUT)
  logUserOut(@Req() request: RequestI) {
    return this.logoutService.logUserOut(request.user.sub);
  }
}
