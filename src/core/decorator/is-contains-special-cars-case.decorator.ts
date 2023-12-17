import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { specialCharacters } from 'shared/constants/validation-helpers.constant';

@ValidatorConstraint({ name: 'IsContainsSpecialChar', async: false })
class IsContainsSpecialCharValidator implements ValidatorConstraintInterface {
  validate(value: string, _?: ValidationArguments | undefined): boolean {
    if (!value) return false;
    const specialCharactersCase = specialCharacters.find(
      (specialCharacters) => {
        return value.includes(specialCharacters);
      },
    );
    return specialCharactersCase ? true : false;
  }
}

export const IsContainsSpecialChar = (validationOptions: ValidationOptions) => {
  return (object: object, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsContainsSpecialCharValidator,
    });
};
