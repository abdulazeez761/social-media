import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { uppercaseLetters } from 'shared/constants/validation-helpers.constant';

@ValidatorConstraint({ name: 'IsContainsUpperCase', async: false })
class IsContainsUpperCaseValidator implements ValidatorConstraintInterface {
  validate(value: string, _?: ValidationArguments | undefined): boolean {
    if (!value) return false;
    const isUpperCase = uppercaseLetters.find((upperCaseChar) => {
      return value.includes(upperCaseChar);
    });
    return isUpperCase ? true : false;
  }
}

export const IsContainsUpperCase = (validationOptions: ValidationOptions) => {
  return (object: object, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsContainsUpperCaseValidator,
    });
};
