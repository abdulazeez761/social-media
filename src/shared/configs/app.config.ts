import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from 'core/exception-filters/http-exception.filter';
import { TypeOrmExceptionFilter } from 'core/exception-filters/db-duplicate-key-constraint.filter';
import { AccessTokenGuard } from 'core/guards/access-token.guard';
import { LoggingInterceptor } from 'core/interceptors/logging.interceptor';
import { ResponseMappingInterceptor } from 'core/interceptors/response-mapping.interceptor';

const accessTokenGuardProvider: Provider<AccessTokenGuard> = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};
const httpExceptionFilterProvider: Provider<HttpExceptionFilter> = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
const queryExceptionFilterProvider: Provider<TypeOrmExceptionFilter> = {
  provide: APP_FILTER,
  useClass: TypeOrmExceptionFilter,
};

const loggingInterceptor: Provider<LoggingInterceptor> = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};

const responseMappingInterceptor: Provider<ResponseMappingInterceptor> = {
  provide: APP_INTERCEPTOR,
  useClass: ResponseMappingInterceptor,
};

export const filters = [
  httpExceptionFilterProvider,
  queryExceptionFilterProvider,
];
export const guards = [accessTokenGuardProvider];
export const interceptors = [loggingInterceptor, responseMappingInterceptor];
