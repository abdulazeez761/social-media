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
const cache_module_1 = require("./core/lib/cache/cache.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const logger_module_1 = require("./core/lib/logger/logger.module");
const schedule_1 = require("@nestjs/schedule");
const cron_job_module_1 = require("./core/lib/cron-job/cron-job.module");
const config_1 = require("@nestjs/config");
const app_config_1 = require("./shared/configs/app.config");
const app_option_1 = require("./shared/configs/app.option");
cache_module_1.CacheModule;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(app_option_1.configOptions),
            logger_module_1.LoggerModule,
            schedule_1.ScheduleModule.forRoot(),
            nestjs_i18n_1.I18nModule.forRoot(app_option_1.i18nOptions),
            cron_job_module_1.CronJobModule,
            jwt_1.JwtModule.registerAsync(app_option_1.jwtOptions),
            cache_module_1.CacheModule.register('cache-manager-redis-yet'),
            modules_module_1.ModulesModule,
        ],
        controllers: [],
        providers: [...app_config_1.interceptors, ...app_config_1.guards, ...app_config_1.filters],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map