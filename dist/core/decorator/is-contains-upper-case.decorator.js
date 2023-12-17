"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsContainsUpperCase = void 0;
const class_validator_1 = require("class-validator");
const validation_helpers_constant_1 = require("../../shared/constants/validation-helpers.constant");
let IsContainsUpperCaseValidator = class IsContainsUpperCaseValidator {
    validate(value, _) {
        if (!value)
            return false;
        const isUpperCase = validation_helpers_constant_1.uppercaseLetters.find((upperCaseChar) => {
            return value.includes(upperCaseChar);
        });
        return isUpperCase ? true : false;
    }
};
IsContainsUpperCaseValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsContainsUpperCase', async: false })
], IsContainsUpperCaseValidator);
const IsContainsUpperCase = (validationOptions) => {
    return (object, propertyName) => (0, class_validator_1.registerDecorator)({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: IsContainsUpperCaseValidator,
    });
};
exports.IsContainsUpperCase = IsContainsUpperCase;
//# sourceMappingURL=is-contains-upper-case.decorator.js.map