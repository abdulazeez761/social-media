"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const requests_logger_service_1 = require("../lib/logger/requests-logger.service");
const rxjs_1 = require("rxjs");
const request_mapper_util_1 = require("../../shared/util/request-mapper.util");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(requestsLoggerService) {
        this.requestsLoggerService = requestsLoggerService;
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const then = Date.now();
        return next.handle().pipe((0, rxjs_1.map)((responseFromApp) => {
            const MS_TO_S = 1000;
            const requestDuration = (Date.now() - then) / MS_TO_S;
            responseFromApp.requestDuration = requestDuration;
            const loggedRequest = (0, request_mapper_util_1.requestMapper)(request);
            this.requestsLoggerService.logRequest(loggedRequest, responseFromApp);
            return responseFromApp;
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [requests_logger_service_1.RequestsLoggerService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map