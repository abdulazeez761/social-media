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
exports.CreateUserDto = void 0;
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const is_contains_lower_case_decorator_1 = require("../../../core/decorator/is-contains-lower-case.decorator");
const is_contains_special_cars_case_decorator_1 = require("../../../core/decorator/is-contains-special-cars-case.decorator");
const is_contains_upper_case_decorator_1 = require("../../../core/decorator/is-contains-upper-case.decorator");
const nestjs_i18n_1 = require("nestjs-i18n");
const gender_enum_1 = require("../../../shared/enums/gender.enum");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "id", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: "User's username",
        example: 'mut1aq',
        isArray: false,
        maxLength: 30,
        minLength: 3,
        name: 'username',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsNotEmpty)({
        message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.isNotEmpty'),
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: "User's email",
        example: 'abdulaziz@gmail.com',
        isArray: false,
        maxLength: 320,
        minLength: 5,
        name: 'email',
        required: true,
        type: String,
    }),
    (0, class_validator_2.MaxLength)(320),
    (0, class_validator_2.MinLength)(5),
    (0, class_validator_1.IsEmail)(undefined, {
        message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.email'),
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: "User's password",
        example: 'abdulaziz26!2003',
        isArray: false,
        maxLength: 30,
        minLength: 8,
        name: 'password',
        required: true,
        type: String,
    }),
    (0, class_validator_2.MaxLength)(30),
    (0, class_validator_2.MinLength)(8),
    (0, class_validator_1.IsString)(),
    (0, is_contains_lower_case_decorator_1.IsContainsLowercase)({
        message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.passwordContains.lowercase'),
    }),
    (0, is_contains_upper_case_decorator_1.IsContainsUpperCase)({
        message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.passwordContains.uppercase'),
    }),
    (0, is_contains_special_cars_case_decorator_1.IsContainsSpecialChar)({
        message: (0, nestjs_i18n_1.i18nValidationMessage)('validation.passwordContains.specialCharacter'),
    }),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, decorators_1.ApiProperty)({
        description: "User's password",
        example: 'mut1aq.54321',
        isArray: false,
        maxLength: 30,
        minLength: 8,
        name: 'password',
        required: true,
        type: Number,
        enum: gender_enum_1.Gender,
    }),
    (0, class_validator_2.IsEnum)(gender_enum_1.Gender),
    (0, class_validator_2.IsNumber)({ allowInfinity: false, allowNaN: false }, { message: 'Gender must be a number' }),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_2.IsISO8601)(),
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_2.MaxLength)(20),
    (0, class_validator_2.MinLength)(3),
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_2.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
//# sourceMappingURL=create-user.dto.js.map