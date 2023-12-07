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
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const gender_enum_1 = require("../../../shared/enums/gender.enum");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.IsNotEmpty)({ message: 'Username must be provided' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
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