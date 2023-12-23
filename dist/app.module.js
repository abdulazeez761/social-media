"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const modules_module_1 = require("./modules/modules.module");
const app_option_1 = require("./shared/configs/app.option");
const cache_module_1 = require("./core/lib/cache/cache.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const app_config_1 = require("./shared/configs/app.config");
const logger_module_1 = require("./core/lib/logger/logger.module");
const schedule_1 = require("@nestjs/schedule");
const cron_job_module_1 = require("./core/lib/cron-job/cron-job.module");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const request_id_middleware_1 = require("./core/middlewares/request-id.middleware");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply((0, helmet_1.default)(), request_id_middleware_1.RequestIdMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(app_option_1.configOptions),
            logger_module_1.LoggerModule,
            schedule_1.ScheduleModule.forRoot(),
            cron_job_module_1.CronJobModule,
            nestjs_i18n_1.I18nModule.forRoot(app_option_1.i18nOptions),
            jwt_1.JwtModule.registerAsync(app_option_1.jwtOptions),
            cache_module_1.CacheModule.register('cache-manager-redis-yet'),
            typeorm_1.TypeOrmModule.forRootAsync(app_option_1.TypeORMOptions),
            modules_module_1.ModulesModule,
        ],
        controllers: [],
        providers: [...app_config_1.guards, ...app_config_1.filters, ...app_config_1.interceptors],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map