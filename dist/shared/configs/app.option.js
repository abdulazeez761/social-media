"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configOptions = exports.i18nOptions = exports.cacheManagerOptions = exports.jwtOptions = void 0;
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const nestjs_i18n_1 = require("nestjs-i18n");
const path_1 = require("path");
const Joi = require("joi");
const dist_1 = require("@nestjs/config/dist");
exports.jwtOptions = {
    useFactory: async (configService) => ({
        secret: configService.get('USER_ACCESS_TOKEN_SECRET'),
    }),
    global: true,
    inject: [dist_1.ConfigService],
};
exports.cacheManagerOptions = {
    useFactory: async () => ({
        store: cache_manager_redis_yet_1.redisStore,
        socket: {
            host: 'localhost',
            port: 6379,
            tls: false,
        },
    }),
};
exports.i18nOptions = {
    fallbackLanguage: 'en',
    loaderOptions: {
        path: (0, path_1.join)(__dirname, '../../resources/i18n'),
        watch: true,
    },
    typesOutputPath: (0, path_1.join)(`${process.cwd()}/src/resources/generated/i18n.generated.ts`),
    resolvers: [
        { use: nestjs_i18n_1.QueryResolver, options: ['lang', 'locale', 'l'] },
        new nestjs_i18n_1.HeaderResolver(['x-custom-lang']),
        nestjs_i18n_1.AcceptLanguageResolver,
        new nestjs_i18n_1.CookieResolver(['lang', 'locale', 'l']),
    ],
};
exports.configOptions = {
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
//# sourceMappingURL=app.option.js.map