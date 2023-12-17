import { ResponseMappingInterceptor } from 'core/Interceptors/response-mapping.interceptor';
import { AccessTokenGuard } from 'core/guards/access-token/access-token.guard';
import { HttpExceptionFilter } from 'core/lib/exception-filters/http-exception.filter';
export declare const filters: import("@nestjs/common").ClassProvider<HttpExceptionFilter>[];
export declare const guards: import("@nestjs/common").ClassProvider<AccessTokenGuard>[];
export declare const interceptors: import("@nestjs/common").ClassProvider<ResponseMappingInterceptor>[];
