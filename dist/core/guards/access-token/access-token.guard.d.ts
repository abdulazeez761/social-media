import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'core/lib/cache/cache.service';
import { ConfigService } from '@nestjs/config';
export declare class AccessTokenGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflect;
    private readonly cacheService;
    private readonly configService;
    constructor(jwtService: JwtService, reflect: Reflector, cacheService: CacheService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
