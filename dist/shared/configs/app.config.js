"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptors = exports.guards = exports.filters = void 0;
const core_1 = require("@nestjs/core");
const logging_interceptor_1 = require("../../core/Interceptors/logging.interceptor");
const response_mapping_interceptor_1 = require("../../core/Interceptors/response-mapping.interceptor");
const access_token_guard_1 = require("../../core/guards/access-token/access-token.guard");
const http_exception_filter_1 = require("../../core/lib/exception-filters/http-exception.filter");
const accessTokenGuardProvider = {
    provide: core_1.APP_GUARD,
    useClass: access_token_guard_1.AccessTokenGuard,
};
const httpExceptionFilterProvider = {
    provide: core_1.APP_FILTER,
    useClass: http_exception_filter_1.HttpExceptionFilter,
};
const loggingInterceptor = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: logging_interceptor_1.LoggingInterceptor,
};
const responseMappingInterceptor = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: response_mapping_interceptor_1.ResponseMappingInterceptor,
};
exports.filters = [httpExceptionFilterProvider];
exports.guards = [accessTokenGuardProvider];
exports.interceptors = [loggingInterceptor, responseMappingInterceptor];
//# sourceMappingURL=app.config.js.map