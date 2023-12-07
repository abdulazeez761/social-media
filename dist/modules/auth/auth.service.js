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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("@nestjs/jwt/dist/jwt.service");
const cache_service_1 = require("../../core/lib/cache/cache.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, cacheService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.cacheService = cacheService;
    }
    async create(createUserDto) {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        createUserDto.password = hashedPassword;
        this.userService.createuserForAuth(createUserDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Created User Successfully',
        };
    }
    async logUserIn(logUserInDto) {
        const { email } = logUserInDto;
        const user = this.userService.findUserByEmail(email);
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
                secret: "@AA@23&^D^*&^&DWA^&D^A&D^&SD()()*-989daw>++++_+A1123djakwjdawdja213_AccessToken",
                expiresIn: '1d'
            });
            this.cacheService.set(user.id + '', {
                userID: user.id,
                accessToken: accessToken
            }, 0);
            return { accessToken };
        }
        accessToken = userFromCache?.accessToken;
        return accessToken;
    }
    async logUserOut(id) {
        await this.cacheService.deleteField(id + '', "accessToken");
        return {
            message: 'logend out!',
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_service_1.JwtService,
        cache_service_1.CacheService])
], AuthService);
//# sourceMappingURL=auth.service.js.map