import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DecodedTokenI } from 'src/shared/interfaces/decoded-token.interface';
import { RequestI } from 'src/shared/interfaces/request.interface';
import { IS_PUBLIC_KEY } from 'src/core/decorator/public.decorator';
import { CacheService } from 'src/core/lib/cache/cache.service';
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

      const isRecivedTokenExisttInCache = userFromCache.accessToken === accesToken;
      if (!isRecivedTokenExisttInCache)
        throw new HttpException("اساعدك؟", HttpStatus.UNAUTHORIZED);

      request.user = decodedToken;

      return true;

    } catch (error) {
      throw new HttpException(
        !!error?.message ? error.message : 'You must be logged in first',
        !!error?.status ? error.status : HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

