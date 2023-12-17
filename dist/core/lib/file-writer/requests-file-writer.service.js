"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsFileWriterService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let RequestsFileWriterService = class RequestsFileWriterService {
    get requestsLogFilePath() {
        return './logs/app-requests.json';
    }
    writeToRequestsLogFile(requestsFileEntry) {
        try {
            const writeStream = (0, fs_1.createWriteStream)(this.requestsLogFilePath, {
                flags: 'r+',
                start: (0, fs_1.statSync)(this.requestsLogFilePath).size - 2,
            });
            writeStream.write(JSON.stringify([requestsFileEntry], null, 2).replace(/\[/, ','), (streamError) => {
                return streamError;
            });
        }
        catch (error) {
            if (error instanceof RangeError) {
                const writeStream = (0, fs_1.createWriteStream)(this.requestsLogFilePath, {
                    flags: 'r+',
                });
                writeStream.write(JSON.stringify([requestsFileEntry], null, 2), (streamError) => {
                    return streamError;
                });
            }
        }
    }
};
exports.RequestsFileWriterService = RequestsFileWriterService;
exports.RequestsFileWriterService = RequestsFileWriterService = __decorate([
    (0, common_1.Injectable)()
], RequestsFileWriterService);
//# sourceMappingURL=requests-file-writer.service.js.map