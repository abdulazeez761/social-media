import { Controller, Post, Body, UseInterceptors, Req, Get, ParseIntPipe, Param } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LogUserInDto } from './dto/log-user-in.dto';
import { Public } from 'src/core/decorator/public.decorator';
import { LoggingInterceptor } from 'src/core/Interceptors/just-for-testing.interseptor';
@Public()
// @UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) { }
  @Post('register-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto)
  }

  @Public()
  // @UseInterceptors(LoggingInterceptor)
  @Post('login-user')
  loginUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.authService.logUserIn(logUserInDto)
  }

  @Get("logout-user/:id")
  logUserOut(@Param('id', ParseIntPipe) id: number) {
    return this.authService.logUserOut(id)

  }

}
// function Get(arg0: string): (target: AuthController, propertyKey: "logUserOut", descriptor: TypedPropertyDescriptor<(req: any) => any>) => void | TypedPropertyDescriptor<(req: any) => any> {
//   throw new Error('Function not implemented.');
// }

