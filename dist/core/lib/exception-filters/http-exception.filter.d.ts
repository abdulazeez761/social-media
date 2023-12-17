import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ExceptionsLoggerService } from '../logger/exceptions-logger.service';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly exceptionsLoggerService;
    constructor(exceptionsLoggerService: ExceptionsLoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
