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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const cache_service_1 = require("../../core/lib/cache/cache.service");
const users_service_1 = require("../users/users.service");
let LoginService = class LoginService {
    constructor(usersService, jwtService, cacheService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.cacheService = cacheService;
        this.configService = configService;
    }
    async logUserIn(logUserInDto) {
        const { email } = logUserInDto;
        const user = this.usersService.findUserByEmail(email);
        if (!user)
            throw new common_1.HttpException('User Credentials is incorrect', common_1.HttpStatus.UNAUTHORIZED);
        const { password } = user;
        const isPasswordCorrect = await bcrypt.compare(logUserInDto.password, password);
        if (!isPasswordCorrect)
            throw new common_1.HttpException('User Credentials is incorrect', common_1.HttpStatus.UNAUTHORIZED);
        const payload = {
            sub: user.id,
        };
        const userFromCache = await this.cacheService.get(user.id + '');
        let accessToken = undefined;
        if (!userFromCache?.accessToken) {
            accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get('USER_ACCESS_TOKEN_SECRET'),
                expiresIn: this.configService.get('USER_ACCESS_TOKEN_EXPIRES_IN'),
            });
            await this.cacheService.set(user.id + '', {
                userID: user.id + '',
                accessToken,
            }, 0);
            return {
                data: accessToken,
                message: 'logged in successfully',
                httpStatus: common_1.HttpStatus.OK,
            };
        }
        accessToken = userFromCache?.accessToken;
        return {
            data: accessToken,
            message: 'logged in successfully',
            httpStatus: common_1.HttpStatus.OK,
        };
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        cache_service_1.CacheService,
        config_1.ConfigService])
], LoginService);
//# sourceMappingURL=login.service.js.map