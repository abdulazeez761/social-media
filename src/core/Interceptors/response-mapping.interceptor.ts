import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { isResponseFromService } from 'shared/util/response-validator.util';

@Injectable()
export class ResponseMappingInterceptor
  implements NestInterceptor<ResponseFromServiceI, ResponseFromServiceI>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseFromServiceI>,
  ): Observable<ResponseFromServiceI> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((responseFromService) => {
        isResponseFromService(responseFromService);
        const { data, httpStatus, message } = responseFromService;
        const responseFromApp: ResponseFromServiceI = {
          data,
          httpStatus,
          message,
        };
        response.status(httpStatus);

        return responseFromApp;
      }),
    );
  }
}
