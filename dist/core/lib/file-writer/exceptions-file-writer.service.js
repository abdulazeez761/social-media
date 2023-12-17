"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFileWriterService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let ExceptionsFileWriterService = class ExceptionsFileWriterService {
    get exceptionsLogFilePath() {
        return './logs/app-exceptions.json';
    }
    writeToExceptionsLogFile(exception) {
        try {
            const writeStream = (0, fs_1.createWriteStream)(this.exceptionsLogFilePath, {
                flags: 'r+',
                start: (0, fs_1.statSync)(this.exceptionsLogFilePath).size - 2,
            });
            writeStream.write(JSON.stringify([exception], null, 2).replace(/\[/, ','), (streamError) => {
                return streamError;
            });
        }
        catch (error) {
            if (error instanceof RangeError) {
                const writeStream = (0, fs_1.createWriteStream)(this.exceptionsLogFilePath, {
                    flags: 'r+',
                });
                writeStream.write(JSON.stringify([exception], null, 2), (streamError) => {
                    return streamError;
                });
            }
        }
    }
};
exports.ExceptionsFileWriterService = ExceptionsFileWriterService;
exports.ExceptionsFileWriterService = ExceptionsFileWriterService = __decorate([
    (0, common_1.Injectable)()
], ExceptionsFileWriterService);
//# sourceMappingURL=exceptions-file-writer.service.js.map