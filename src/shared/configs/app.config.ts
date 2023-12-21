import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'core/Interceptors/logging.interceptor';
import { ResponseMappingInterceptor } from 'core/Interceptors/response-mapping.interceptor';

import { AccessTokenGuard } from 'core/guards/access-token/access-token.guard';
import { HttpExceptionFilter } from 'core/lib/exception-filters/http-exception.filter';

const accessTokenGuardProvider: Provider<AccessTokenGuard> = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};
const httpExceptionFilterProvider: Provider<HttpExceptionFilter> = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

const loggingInterceptor: Provider<LoggingInterceptor> = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};

const responseMappingInterceptor: Provider<ResponseMappingInterceptor> = {
  provide: APP_INTERCEPTOR,
  useClass: ResponseMappingInterceptor,
};

export const filters = [httpExceptionFilterProvider];
export const guards = [accessTokenGuardProvider];
export const interceptors = [loggingInterceptor, responseMappingInterceptor];
