import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'core/lib/cache/cache.service';
import { IS_PUBLIC_KEY } from 'core/decorator/public.decorator';
import { DecodedTokenI } from 'shared/interfaces/decoded-token.interface';
import { RequestI } from 'shared/interfaces/request.interface';
// import { Error } from 'shared/interfaces/error.interface';
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflect: Reflector,
    // private readonly userService: UsersService
    private readonly cacheService: CacheService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<RequestI>();
      const authorization = request.headers.authorization;

      const isPublic = this.reflect.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getClass(),
        context.getHandler()
      ])
      if (isPublic) return true;

      if (!authorization || Array.isArray(authorization) || typeof authorization !== 'string')
        throw new HttpException('Invalid Headers', HttpStatus.UNAUTHORIZED);

      const [bearer, accesToken] = authorization.split(" ")

      if (bearer !== "Bearer") throw new HttpException('Invalid Headers', HttpStatus.UNAUTHORIZED);

      const decodedToken = this.jwtService.verify<DecodedTokenI>(accesToken, {
        secret: "@AA@23&^D^*&^&DWA^&D^A&D^&SD()()*-989daw>++++_+A1123djakwjdawdja213_AccessToken"
      });
      const { sub } = decodedToken;

      const userFromCache = await this.cacheService.get<{
        accessToken: string;
        userID: string;
      }>(sub + '')

      const isRecivedTokenExisttInCache = userFromCache?.accessToken === accesToken;
      if (!isRecivedTokenExisttInCache)
        throw new HttpException("اساعدك؟", HttpStatus.UNAUTHORIZED);

      request.user = decodedToken;

      return true;

    } catch (error ) {
      const typedError = error as Error;
      throw new HttpException(
        !!typedError.message ? typedError.message : 'You must be logged in first',
         HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

