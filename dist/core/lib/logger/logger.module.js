"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const file_writer_module_1 = require("../file-writer/file-writer.module");
const exceptions_logger_service_1 = require("./exceptions-logger.service");
const logger_listener_1 = require("./logger.listener");
const logger_service_1 = require("./logger.service");
const requests_logger_service_1 = require("./requests-logger.service");
let LoggerModule = class LoggerModule extends logger_listener_1.LoggerListener {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        providers: [exceptions_logger_service_1.ExceptionsLoggerService, logger_service_1.LoggerService, requests_logger_service_1.RequestsLoggerService],
        exports: [exceptions_logger_service_1.ExceptionsLoggerService, requests_logger_service_1.RequestsLoggerService],
        imports: [file_writer_module_1.FileWriterModule],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map