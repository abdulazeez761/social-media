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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const common_2 = require("@nestjs/common");
const cache_service_1 = require("../../core/lib/cache/cache.service");
const nestjs_i18n_1 = require("nestjs-i18n");
let UsersService = class UsersService {
    constructor(cacheService, i18nService) {
        this.cacheService = cacheService;
        this.i18nService = i18nService;
        this.users = [];
    }
    createUserForAuth(createUserDto) {
        const { email } = createUserDto;
        const user = this.findUserByEmail(email);
        if (user)
            throw new common_2.HttpException(this.i18nService.translate('shared.errors.userAlreadyExist', {
                args: {
                    entity: this.i18nService.translate('entities.user'),
                },
            }), common_1.HttpStatus.CONFLICT);
        let length = this.users.length;
        const createdUser = new user_entity_1.User({
            ...createUserDto,
            id: ++length,
        });
        this.users.push(createdUser);
        return createdUser;
    }
    findUserByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    async create(createUserDto) {
        const { password, email } = createUserDto;
        let length = this.users.length;
        const hashedPassword = await bcrypt.hash(password, 10);
        const isUserExist = this.findUserByEmail(email);
        if (isUserExist)
            throw new common_2.HttpException(this.i18nService.translate('shared.errors.userAlreadyExist', {
                args: {
                    entity: this.i18nService.translate('entities.user'),
                },
            }), common_1.HttpStatus.CONFLICT);
        const user = new user_entity_1.User({
            ...createUserDto,
            id: ++length,
            password: hashedPassword,
        });
        this.users.push(user);
        return {
            httpStatus: common_1.HttpStatus.CREATED,
            message: this.i18nService.translate('shared.success.create'),
            data: user,
        };
    }
    findAll() {
        return {
            httpStatus: common_1.HttpStatus.OK,
            message: this.i18nService.translate('shared.success.approve'),
            data: this.users,
        };
    }
    findOne(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user)
            throw new common_2.HttpException(this.i18nService.translate('shared.errors.userAlreadyExist', {
                args: {
                    entity: this.i18nService.translate('entities.user'),
                },
            }), common_1.HttpStatus.CONFLICT);
        return {
            data: user,
            message: this.i18nService.translate('shared.success.approve'),
            httpStatus: common_1.HttpStatus.OK,
        };
    }
    update(id, updateUserDto) {
        const user = this.users.find((user) => user.id === id);
        user?.updateOne(updateUserDto);
        return {
            data: user,
            message: this.i18nService.translate('shared.errors.update', {
                args: {
                    entity: this.i18nService.translate('entities.user'),
                },
            }),
            httpStatus: common_1.HttpStatus.OK,
        };
    }
    remove(id) {
        const user = this.findOne(id);
        let userID = user.data.id + '';
        this.users = this.users.filter((user) => user.id !== id);
        this.cacheService.deleteUserFromCache(userID);
        return {
            data: user,
            message: this.i18nService.translate('shared.success.delete', {
                args: {
                    entity: this.i18nService.translate('entities.user'),
                },
            }),
            httpStatus: common_1.HttpStatus.OK,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        nestjs_i18n_1.I18nService])
], UsersService);
//# sourceMappingURL=users.service.js.map