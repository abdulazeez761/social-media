import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
export declare class ResponseMappingInterceptor implements NestInterceptor<ResponseFromServiceI, ResponseFromServiceI> {
    intercept(context: ExecutionContext, next: CallHandler<ResponseFromServiceI>): Observable<ResponseFromServiceI>;
}
