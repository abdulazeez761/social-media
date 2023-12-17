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
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const cache_service_1 = require("../../lib/cache/cache.service");
const public_decorator_1 = require("../../decorator/public.decorator");
const config_1 = require("@nestjs/config");
let AccessTokenGuard = class AccessTokenGuard {
    constructor(jwtService, reflect, cacheService, configService) {
        this.jwtService = jwtService;
        this.reflect = reflect;
        this.cacheService = cacheService;
        this.configService = configService;
    }
    async canActivate(context) {
        try {
            const ctx = context.switchToHttp();
            const request = ctx.getRequest();
            const authorization = request.headers.authorization;
            const isPublic = this.reflect.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
                context.getClass(),
                context.getHandler(),
            ]);
            if (isPublic)
                return true;
            if (!authorization ||
                Array.isArray(authorization) ||
                typeof authorization !== 'string')
                throw new common_1.HttpException('Invalid Headers', common_1.HttpStatus.UNAUTHORIZED);
            const [bearer, accesToken] = authorization.split(' ');
            if (bearer !== 'Bearer')
                throw new common_1.HttpException('Invalid Headers', common_1.HttpStatus.UNAUTHORIZED);
            const decodedToken = this.jwtService.verify(accesToken, {
                secret: this.configService.get('USER_ACCESS_TOKEN_SECRET'),
            });
            const { sub } = decodedToken;
            const userFromCache = await this.cacheService.get(sub + '');
            const isRecivedTokenExisttInCache = userFromCache?.accessToken === accesToken;
            if (!isRecivedTokenExisttInCache)
                throw new common_1.HttpException('اساعدك؟', common_1.HttpStatus.UNAUTHORIZED);
            request.user = decodedToken;
            return true;
        }
        catch (error) {
            const typedError = error;
            throw new common_1.HttpException(!!typedError.message
                ? typedError.message
                : 'You must be logged in first', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AccessTokenGuard = AccessTokenGuard;
exports.AccessTokenGuard = AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector,
        cache_service_1.CacheService,
        config_1.ConfigService])
], AccessTokenGuard);
//# sourceMappingURL=access-token.guard.js.map