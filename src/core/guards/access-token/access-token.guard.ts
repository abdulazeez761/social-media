import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'core/lib/cache/cache.service';
import { IS_PUBLIC_KEY } from 'core/decorator/public.decorator';
import { DecodedTokenI } from 'shared/interfaces/http/decoded-token.interface';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { ConfigService } from '@nestjs/config';
import { CacheObjectI } from 'shared/interfaces/general/cache-object.interface';
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflect: Reflector,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<RequestI>();
      const authorization = request.headers.authorization;

      const isPublic = this.reflect.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getClass(),
        context.getHandler(),
      ]);
      if (isPublic) return true;

      if (
        !authorization ||
        Array.isArray(authorization) ||
        typeof authorization !== 'string'
      )
        throw new HttpException('Invalid Headers', HttpStatus.UNAUTHORIZED);

      const [bearer, accesToken] = authorization.split(' ');

      if (bearer !== 'Bearer')
        throw new HttpException('Invalid Headers', HttpStatus.UNAUTHORIZED);

      const decodedToken = this.jwtService.verify<DecodedTokenI>(accesToken, {
        secret: this.configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
      });
      const { sub } = decodedToken;

      const userFromCache = await this.cacheService.get<CacheObjectI>(sub + '');

      const isRecivedTokenExisttInCache =
        userFromCache?.accessToken === accesToken;
      if (!isRecivedTokenExisttInCache)
        throw new HttpException('اساعدك؟', HttpStatus.UNAUTHORIZED);

      request.user = decodedToken;

      return true;
    } catch (error) {
      const typedError = error as Error;
      throw new HttpException(
        !!typedError.message
          ? typedError.message
          : 'You must be logged in first',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
