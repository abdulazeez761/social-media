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
exports.ExceptionsLoggerService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_file_writer_service_1 = require("../file-writer/exceptions-file-writer.service");
let ExceptionsLoggerService = class ExceptionsLoggerService {
    constructor(exceptionsFileWriterService) {
        this.exceptionsFileWriterService = exceptionsFileWriterService;
    }
    logException(exception) {
        return this.exceptionsFileWriterService.writeToExceptionsLogFile(exception);
    }
};
exports.ExceptionsLoggerService = ExceptionsLoggerService;
exports.ExceptionsLoggerService = ExceptionsLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exceptions_file_writer_service_1.ExceptionsFileWriterService])
], ExceptionsLoggerService);
//# sourceMappingURL=exceptions-logger.service.js.map