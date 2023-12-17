import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly logoutServiec: LogoutService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @ApiResponse(registerRouteApiResponse)
  @Post('register-user')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.registerService.registerUser(createUserDto);
  }

  @Public()
  @Post('login-user')
  logUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.loginService.logUserIn(logUserInDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('logout-user/:id')
  logUserOut(@Param('id', ParseIntPipe) id: number) {
    return this.logoutServiec.logUserOut(id);
  }
}
