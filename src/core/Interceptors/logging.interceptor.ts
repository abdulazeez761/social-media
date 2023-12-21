import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RequestsLoggerService } from 'core/lib/logger/requests-logger.service';
import { map, Observable } from 'rxjs';
// import { REQUEST_ID_TOKEN_HEADER } from 'shared/constants/general.constant';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { ResponseFromApp } from 'shared/types/response-from-app.type';
import { requestMapper } from 'shared/util/request-mapper.util';

@Injectable()
export class LoggingInterceptor
  implements NestInterceptor<ResponseFromApp, ResponseFromApp>
{
  constructor(private readonly requestsLoggerService: RequestsLoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseFromApp>,
  ): Observable<ResponseFromApp> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestI>();
    const then = Date.now();

    return next.handle().pipe(
      map((responseFromApp) => {
        const MS_TO_S = 1000;
        const requestDuration = (Date.now() - then) / MS_TO_S;
        responseFromApp.requestDuration = requestDuration;
        const loggedRequest = requestMapper(request);
        this.requestsLoggerService.logRequest(loggedRequest, responseFromApp);
        return responseFromApp;
      }),
    );
  }
}
