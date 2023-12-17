import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CacheService } from 'core/lib/cache/cache.service';
import { UsersService } from 'modules/users/users.service';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { LogUserInDto } from './dto/log-user-in.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}
  /**
   * Provided Email and Password
   *
   * If User Exist
   * Check Password using bcrypt, and I make sure that the checked password aligns with the given email
   *
   * action to show that the user logged
   */
  async logUserIn(
    logUserInDto: LogUserInDto,
  ): Promise<ResponseFromServiceI<string>> {
    const { email } = logUserInDto;

    const user = this.usersService.findUserByEmail(email);

    if (!user)
      throw new HttpException(
        'User Credentials is incorrect',
        HttpStatus.UNAUTHORIZED,
      );

    const { password } = user;
    const isPasswordCorrect = await bcrypt.compare(
      logUserInDto.password,
      password,
    );

    if (!isPasswordCorrect)
      throw new HttpException(
        'User Credentials is incorrect',
        HttpStatus.UNAUTHORIZED,
      );

    const payload = {
      sub: user.id,
    };

    const userFromCache = await this.cacheService.get<{
      accessToken: string;
      userID: string;
    }>(user.id + '');

    let accessToken = undefined;
    if (!userFromCache?.accessToken) {
      accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
        expiresIn: this.configService.get<string>(
          'USER_ACCESS_TOKEN_EXPIRES_IN',
        )!,
      });

      await this.cacheService.set(
        user.id + '',
        {
          userID: user.id + '',
          accessToken,
        },
        0,
      );

      return {
        data: accessToken,
        message: 'logged in successfully',
        httpStatus: HttpStatus.OK,
      };
    }

    accessToken = userFromCache?.accessToken;

    return {
      data: accessToken,
      message: 'logged in successfully',
      httpStatus: HttpStatus.OK,
    };
  }
}
