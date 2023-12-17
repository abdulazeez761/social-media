import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModuleOptions } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { I18nOptions } from 'nestjs-i18n';
import { RedisClientOptions } from 'redis';
export declare const jwtOptions: JwtModuleAsyncOptions;
export declare const cacheManagerOptions: CacheModuleAsyncOptions<RedisClientOptions>;
export declare const i18nOptions: I18nOptions;
export declare const configOptions: ConfigModuleOptions;
