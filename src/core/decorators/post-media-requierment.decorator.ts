import { HttpException, HttpStatus } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DynamicObjectI } from 'shared/interfaces/general/dynamic-object.interface';

@ValidatorConstraint({ name: 'OneOfOptionalRequired', async: false })
class OneOfOptionalRequiredValidator implements ValidatorConstraintInterface {
  validate(_value: unknown, args: ValidationArguments): boolean {
    const argsObject: DynamicObjectI = args.object;

    // post contains both image and vidoe
    if (argsObject.image && argsObject.video)
      throw new HttpException(
        'post must have : Post with one image.Post with one video. Post with text.Post with image and text. Post with video and text.',
        HttpStatus.BAD_REQUEST,
      );
    else if (argsObject.image && argsObject.text && !argsObject.video)
      // post contains image and text
      return true;
    else if (!argsObject.image && argsObject.text && argsObject.video)
      // post contains video and text
      return true;
    else if (argsObject.image && !argsObject.text && !argsObject.video)
      // post contains only  image
      return true;
    else if (!argsObject.image && !argsObject.text && argsObject.video)
      // post contains only  video
      return true;
    else if (!argsObject.image && argsObject.text && !argsObject.video)
      // post contains only  text
      return true;
    // post contains  image and vidoe and text
    else
      throw new HttpException(
        'post must have : Post with one image.Post with one video. Post with text.Post with image and text. Post with video and text.',
        HttpStatus.BAD_REQUEST,
      );
  }
}

export const OneOfOptionalRequired = (validationOptions: ValidationOptions) => {
  return (object: Object, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: OneOfOptionalRequiredValidator,
    });
};
