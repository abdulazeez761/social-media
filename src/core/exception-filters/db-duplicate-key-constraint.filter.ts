import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { filter } from 'nestjs-conditional-exception-filter';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { TypeORMError } from 'typeorm';
import { Response } from 'express';
import { DynamicObjectI } from 'shared/interfaces/general/dynamic-object.interface';
import { requestMapper } from 'shared/util/request-mapper.util';
import { DbException } from 'shared/types/db-exception.type';
import { ExceptionsLoggerService } from 'core/lib/logger/exceptions-logger.service';

@Catch(
  filter({
    for: TypeORMError,
    when: (error: any) => +error.code === 23505,
  }),
)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly exceptionsLoggerService: ExceptionsLoggerService,
  ) {}
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestI>();
    const statusCode = (exception as DynamicObjectI).status;
    try {
      let code: number = (exception as DynamicObjectI).code;
      let message: string = (exception as DynamicObjectI).message;
      const loggedRequest = requestMapper(request);

      const exceptionBody: DbException = {
        statusCode,
        message,
        code,
        request: loggedRequest,
        time: new Date().toISOString(),
      };

      this.exceptionsLoggerService.logException(exceptionBody);
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: exceptionBody,
        request: request.path,
        time: new Date().toUTCString(),
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error, fire your backend developer',
        request: request.path,
        time: new Date().toUTCString(),
      });
    }
  }
}
