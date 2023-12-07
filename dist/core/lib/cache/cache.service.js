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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
let CacheService = class CacheService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    set(key, value, ttl) {
        this.cacheManager.set(key, value, ttl);
    }
    get(key) {
        return this.cacheManager.get(key);
    }
    async deleteField(key, field) {
        const keyFromCache = await this.get(key);
        if (!keyFromCache)
            throw new common_1.HttpException('Field ' + field + ' Does not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        delete keyFromCache[field];
        return this.set(key, keyFromCache);
    }
    deleteUserFromCache(key) {
        return this.cacheManager.del(key);
    }
    async getField(key, field) {
        const userFromCache = await this.get(key);
        if (!userFromCache)
            throw new common_1.HttpException('Field ' + field + ' Does not exist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return userFromCache[field];
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheService);
//# sourceMappingURL=cache.service.js.map