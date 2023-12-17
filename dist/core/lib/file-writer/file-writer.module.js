"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriterModule = void 0;
const common_1 = require("@nestjs/common");
const exceptions_file_writer_service_1 = require("./exceptions-file-writer.service");
const requests_file_writer_service_1 = require("./requests-file-writer.service");
let FileWriterModule = class FileWriterModule {
};
exports.FileWriterModule = FileWriterModule;
exports.FileWriterModule = FileWriterModule = __decorate([
    (0, common_1.Module)({
        providers: [exceptions_file_writer_service_1.ExceptionsFileWriterService, requests_file_writer_service_1.RequestsFileWriterService],
        exports: [exceptions_file_writer_service_1.ExceptionsFileWriterService, requests_file_writer_service_1.RequestsFileWriterService],
    })
], FileWriterModule);
//# sourceMappingURL=file-writer.module.js.map