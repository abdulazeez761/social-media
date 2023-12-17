import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModuleOptions } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { redisStore } from 'cache-manager-redis-yet';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nOptions,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { RedisClientOptions } from 'redis';
import * as Joi from 'joi';
import { ConfigService } from '@nestjs/config/dist';

export const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
  }),
  global: true,
  inject: [ConfigService],
};

export const cacheManagerOptions: CacheModuleAsyncOptions<RedisClientOptions> =
  {
    useFactory: async () => ({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
        tls: false,
      },
    }),
  };

export const i18nOptions: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '../../resources/i18n'),
    watch: true,
  },
  typesOutputPath: join(
    `${process.cwd()}/src/resources/generated/i18n.generated.ts`,
  ),
  resolvers: [
    { use: QueryResolver, options: ['lang', 'locale', 'l'] },
    new HeaderResolver(['x-custom-lang']),
    AcceptLanguageResolver,
    new CookieResolver(['lang', 'locale', 'l']),
  ],
};

export const configOptions: ConfigModuleOptions = {
  envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
  isGlobal: true,
  cache: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .min(3)
      .max(6)
      .valid('dev', 'prod', 'stable')
      .required(),
    PORT: Joi.number().default(3000),
    USER_ACCESS_TOKEN_SECRET: Joi.string().min(10).required(),
    USER_ACCESS_TOKEN_EXPIRES_IN: Joi.string().min(1).required(),
    ALLOWED_HOSTS: Joi.string().min(1).required(),
    PREFIX: Joi.string().min(3).max(10).required(),
    APP_NAME: Joi.string().min(3).max(30).required(),
  }),
};
