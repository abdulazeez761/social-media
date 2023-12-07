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
const access_token_guard_1 = require("./core/guards/access-token/access-token.guard");
const core_1 = require("@nestjs/core");
const app_options_1 = require("./shared/config/app.options");
const modules_module_1 = require("./modules/modules.module");
const cache_module_1 = require("./core/lib/cache/cache.module");
cache_module_1.CacheModule;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register(app_options_1.jwtOptions),
            cache_module_1.CacheModule.register('cache-manager-redis-yet'),
            modules_module_1.ModulesModule
        ],
        controllers: [],
        providers: [{
                provide: core_1.APP_GUARD,
                useClass: access_token_guard_1.AccessTokenGuard
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map