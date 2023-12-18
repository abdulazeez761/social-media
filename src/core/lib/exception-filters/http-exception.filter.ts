import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { Response } from 'express';
import { ExceptionsLoggerService } from '../logger/exceptions-logger.service';
import { ExceptionI } from 'shared/interfaces/http/exception.interface';
import { requestMapper } from 'shared/util/request-mapper.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly exceptionsLoggerService: ExceptionsLoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestI>();
    const statusCode = exception.getStatus();
    const { message } = exception;
    const LoggedRequest = requestMapper(request);
    try {
      const loggedException: ExceptionI = {
        statusCode,
        message,
        time: new Date().toISOString(),
        request: LoggedRequest,
      };

      this.exceptionsLoggerService.logException(loggedException);

      response.status(statusCode).json({
        requestID: LoggedRequest.id,
        status: statusCode,
        timeStamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
    } catch (error: any) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        requestID: LoggedRequest.id,
        status: statusCode,
        timeStamp: new Date().toISOString(),
        path: request.url,
        message: 'some thing went wwrong!',
      });
    }
  }
}
