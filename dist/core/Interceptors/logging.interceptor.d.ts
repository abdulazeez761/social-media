import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { RequestsLoggerService } from 'core/lib/logger/requests-logger.service';
import { Observable } from 'rxjs';
import { ResponseFromApp } from 'shared/types/response-from-app.type';
export declare class LoggingInterceptor implements NestInterceptor<ResponseFromApp, ResponseFromApp> {
    private readonly requestsLoggerService;
    constructor(requestsLoggerService: RequestsLoggerService);
    intercept(context: ExecutionContext, next: CallHandler<ResponseFromApp>): Observable<ResponseFromApp>;
}
