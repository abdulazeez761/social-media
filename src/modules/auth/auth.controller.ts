import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { registerRouteApiResponse } from './constants/register-route-api-response.conatant';
import { LogUserInDto } from './dto/log-user-in.dto';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { Public } from 'core/decorator/public.decorator';
import { LogoutService } from './logout.service';
import { ROUTES } from 'shared/constants/routes.constant';
import { RequestI } from 'shared/interfaces/http/request.interface';

@ApiTags(ROUTES.AUTH.CONTROLLER)
@Controller(ROUTES.AUTH.CONTROLLER)
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly logoutServiec: LogoutService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @ApiResponse(registerRouteApiResponse)
  @Post(ROUTES.AUTH.REGISTER_USER)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.registerService.registerUser(createUserDto);
  }

  @Public()
  @Post(ROUTES.AUTH.LOG_USER_IN)
  logUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.loginService.logUserIn(logUserInDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(ROUTES.AUTH.LOG_USER_OUT)
  logUserOut(@Req() req: RequestI) {
    const userID = req.user.sub;
    return this.logoutServiec.logUserOut(userID);
  }
}
