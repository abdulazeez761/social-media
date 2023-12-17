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
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const exceptions_logger_service_1 = require("../logger/exceptions-logger.service");
const request_mapper_util_1 = require("../../../shared/util/request-mapper.util");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor(exceptionsLoggerService) {
        this.exceptionsLoggerService = exceptionsLoggerService;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = exception.getStatus();
        const { message } = exception;
        const LoggedRequest = (0, request_mapper_util_1.requestMapper)(request);
        const loggedException = {
            statusCode,
            message,
            time: new Date().toISOString(),
            request: LoggedRequest,
        };
        this.exceptionsLoggerService.logException(loggedException);
        response.status(statusCode).json({
            status: statusCode,
            timeStamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
        try {
        }
        catch (error) {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: statusCode,
                timeStamp: new Date().toISOString(),
                path: request.url,
                message: 'some thing went wwrong!',
            });
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [exceptions_logger_service_1.ExceptionsLoggerService])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map