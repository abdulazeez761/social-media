import { HttpStatus } from '@nestjs/common';
import { DynamicObjectI } from './dynamic-object.interface';

export interface ResponseFromServiceI<
  T = string | number | DynamicObjectI | DynamicObjectI[] | string[] | number[],
> {
  message: string;
  data: T;
  httpStatus: HttpStatus;
}
