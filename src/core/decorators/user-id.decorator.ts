import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { RequestI } from 'shared/interfaces/http/request.interface';

export const UserID = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestI>();
    const userID = request.user.sub;
    if (!isUUID(userID))
      throw new HttpException('ID must be UUid', HttpStatus.BAD_REQUEST);

    return userID;
  },
);
