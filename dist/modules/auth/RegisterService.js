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
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const nestjs_i18n_1 = require("nestjs-i18n");
let RegisterService = class RegisterService {
    constructor(usersService, i18n) {
        this.usersService = usersService;
        this.i18n = i18n;
    }
    async registerUser(createUserDto) {
        const salt = await bcrypt.genSalt(10);
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, salt);
        createUserDto.password = hashedPassword;
        const createdUser = this.usersService.createUserForAuth(createUserDto);
        const requestID = Request.
            return, { httpStatus: HttpStatus, CREATED, message: , this: , i18n, t };
        ('shared.success.create', {
            args: { entity: this.i18n.t('entities.user') },
        }),
            data;
        createdUser,
            requestID;
        requestID.
        ;
    }
    ;
};
exports.RegisterService = RegisterService;
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        nestjs_i18n_1.I18nService])
], RegisterService);
//# sourceMappingURL=RegisterService.js.map