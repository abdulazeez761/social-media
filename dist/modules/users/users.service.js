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
const typeorm_1 = require("@nestjs/typeorm");
const cache_service_1 = require("../../core/lib/cache/cache.service");
const nullability_util_1 = require("../../shared/util/nullability.util");
const typeorm_2 = require("typeorm");
const select_user_constant_1 = require("./constants/select-user.constant");
const user_entity_1 = require("./entities/user.entity");
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
        const { skip, take, email, username } = filterUsersDto;
        const filterObject = {};
        !(0, nullability_util_1.checkNullability)(email)
            ? (filterObject['email'] = (0, typeorm_2.Not)((0, typeorm_2.IsNull)()))
            : (filterObject['email'] = (0, typeorm_2.ILike)(`%${email}%`));
        !(0, nullability_util_1.checkNullability)(username)
            ? (filterObject['username'] = (0, typeorm_2.Not)((0, typeorm_2.IsNull)()))
            : (filterObject['username'] = (0, typeorm_2.ILike)(`%${username}%`));
        const users = await this.usersRepository.find({
            select: select_user_constant_1.selectUser,
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
    async findOne(userID) {
        const user = await this.usersRepository.findOne({
            where: { id: userID },
            select: select_user_constant_1.selectUser,
        });
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
    async update(userID, updateUserDto) {
        const updateResult = await this.usersRepository
            .createQueryBuilder()
            .update(user_entity_1.User)
            .set(updateUserDto)
            .where('id = :id', { id: userID })
            .returning(select_user_constant_1.selectUser)
            .execute();
        if (!updateResult.affected)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        return {
            data: updateResult.raw[0],
            message: {
                translationKey: 'shared.success.update',
                args: { entity: 'entities.user' },
            },
            httpStatus: common_1.HttpStatus.OK,
        };
    }
    async remove(userID) {
        const deleteResult = await this.usersRepository
            .createQueryBuilder()
            .delete()
            .from(user_entity_1.User)
            .where('id = :id', { id: userID })
            .returning(select_user_constant_1.selectUser)
            .execute();
        if (!deleteResult.affected)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
        this.cacheService.del(userID + '');
        return {
            data: deleteResult.raw[0],
            message: {
                translationKey: 'shared.success.delete',
                args: { entity: 'entities.user' },
            },
            httpStatus: common_1.HttpStatus.OK,
        };
    }
    findOneByID(userID) {
        return this.usersRepository.findOneBy({ id: userID });
    }
    findUserByEmail(email) {
        return this.usersRepository.findOneBy({ email });
    }
    findUserByColumn(column, value) {
        return this.usersRepository.findOneBy({ [column]: value });
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