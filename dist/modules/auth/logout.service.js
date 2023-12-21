"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutService = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../core/lib/cache/cache.service");
const users_service_1 = require("../users/users.service");
const nestjs_i18n_1 = require("nestjs-i18n");
let LogoutService = class LogoutService {
    constructor(cacheService, userService, i18nService) {
        this.cacheService = cacheService;
        this.userService = userService;
        this.i18nService = i18nService;
    }
    async logUserOut(userID) {
        await this.cacheService.deleteField(userID + '', 'accessToken');
        const logedOutUser = this.userService.findOne(userID).data;
        return {
            message: this.i18nService.t('shared.success.logout'),
            httpStatus: common_1.HttpStatus.OK,
            data: logedOutUser,
        };
    }
};
exports.LogoutService = LogoutService;
exports.LogoutService = LogoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        users_service_1.UsersService,
        nestjs_i18n_1.I18nService])
], LogoutService);
//# sourceMappingURL=logout.service.js.map