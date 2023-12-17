"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsContainsLowercase = void 0;
const class_validator_1 = require("class-validator");
const validation_helpers_constant_1 = require("../../shared/constants/validation-helpers.constant");
let IsContainsLowercaseValidator = class IsContainsLowercaseValidator {
    validate(value, _) {
        if (!value)
            return false;
        for (const lowercaseLetter of validation_helpers_constant_1.lowercaseLetters) {
            if (value.includes(lowercaseLetter))
                return true;
        }
        return false;
    }
};
IsContainsLowercaseValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsLowercase', async: false })
], IsContainsLowercaseValidator);
const IsContainsLowercase = (validationOptions) => {
    return (object, propertyName) => (0, class_validator_1.registerDecorator)({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: IsContainsLowercaseValidator,
    });
};
exports.IsContainsLowercase = IsContainsLowercase;
//# sourceMappingURL=is-contains-lower-case.decorator.js.map