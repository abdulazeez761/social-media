import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { RedisClientOptions } from 'redis';
export declare const jwtOptions: JwtModuleOptions;
export declare const cacheManagerOptions: CacheModuleAsyncOptions<RedisClientOptions>;
