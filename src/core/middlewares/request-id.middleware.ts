import { Injectable, NestMiddleware } from '@nestjs/common';
import { createId, isCuid } from '@paralleldrive/cuid2';
import { NextFunction, Request, Response } from 'express';
import { REQUEST_ID_TOKEN_HEADER } from 'shared/constants/general.constant';
import { requestIdGenerator } from 'shared/interfaces/http/requestID-generator.util';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestID = req.header(REQUEST_ID_TOKEN_HEADER);
    const authorization = req.headers.authorization;

    const date = new Date().toISOString();
    const isTokenOrEmail = authorization
      ? authorization?.split(' ')[1]
      : req.body.email;

    if (!isTokenOrEmail) {
      if (
        !req.headers[REQUEST_ID_TOKEN_HEADER] ||
        (requestID && !isCuid(requestID))
      )
        req.headers[REQUEST_ID_TOKEN_HEADER] = createId();
      res.set(REQUEST_ID_TOKEN_HEADER, req.headers[REQUEST_ID_TOKEN_HEADER]);
      return next();
    }

    const generatedID = requestIdGenerator(date, isTokenOrEmail);

    if (
      !req.headers[REQUEST_ID_TOKEN_HEADER] ||
      (requestID && !isCuid(requestID))
    )
      req.headers[REQUEST_ID_TOKEN_HEADER] = generatedID;

    res.set(REQUEST_ID_TOKEN_HEADER, req.headers[REQUEST_ID_TOKEN_HEADER]);
    next();
  }
}
