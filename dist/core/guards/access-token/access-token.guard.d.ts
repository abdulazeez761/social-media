import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/core/lib/cache/cache.service';
export declare class AccessTokenGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflect;
    private readonly cacheService;
    constructor(jwtService: JwtService, reflect: Reflector, cacheService: CacheService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
