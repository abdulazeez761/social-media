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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../core/lib/cache/cache.service");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    cacheService;
    usersRepository;
    constructor(cacheService, usersRepository) {
        this.cacheService = cacheService;
        this.usersRepository = usersRepository;
    }
    async createUserForAuth(createUserDto) {
        const createdUser = this.usersRepository.create(createUserDto);
        await this.usersRepository.save(createdUser);
        return createdUser;
    }
    async findAll(filterUsersDto) {
        const { take, skip, email, username } = filterUsersDto;
        const filterObject = {};
        !email
            ? (filterObject['email'] = (0, typeorm_2.Not)((0, typeorm_2.IsNull)()))
            : (filterObject['email'] = (0, typeorm_2.ILike)(`%${email}%`));
        !username
            ? (filterObject['username'] = (0, typeorm_2.Not)((0, typeorm_2.IsNull)()))
            : (filterObject['username'] = (0, typeorm_2.ILike)(`%${username}%`));
        const users = await this.usersRepository.find({
            select: ['id', 'username', 'city', 'gender', 'email', '__V'],
            where: [filterObject],
            take,
            skip,
        });
        return {
            data: users,
            httpStatus: common_1.HttpStatus.OK,
            message: {
                translationKey: 'shared.success.findAll',
                args: { entity: 'entities.user' },
            },
        };
    }
    async findOne(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        return {
            data: user,
            httpStatus: common_1.HttpStatus.OK,
            message: {
                translationKey: 'shared.success.findOne',
                args: { entity: 'entities.user' },
            },
        };
    }
    async update(id, updateUserDto) {
        const updateResult = await this.usersRepository.update({ id }, updateUserDto);
        if (!updateResult.affected)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        return {
            data: updateResult.raw,
            message: {
                translationKey: 'shared.success.update',
                args: { entity: 'entities.user' },
            },
            httpStatus: common_1.HttpStatus.OK,
        };
    }
    async remove(id) {
        const deleteResult = await this.usersRepository.delete({ id });
        if (!deleteResult.affected)
            throw new common_1.HttpException('User was not found', common_1.HttpStatus.NOT_FOUND);
        this.cacheService.del(id + '');
        return {
            data: deleteResult.raw,
            message: {
                translationKey: 'shared.success.delete',
                args: { entity: 'entities.user' },
            },
            httpStatus: common_1.HttpStatus.OK,
        };
    }
    findUserByEmail(email) {
        const user = this.usersRepository.findOneBy({ email });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [cache_service_1.CacheService,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map