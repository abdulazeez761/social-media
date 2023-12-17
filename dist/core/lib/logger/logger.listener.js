"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerListener = void 0;
const fs_1 = require("fs");
class LoggerListener {
    onModuleInit() {
        this.createLogFolderAndFilesIfNotExists();
    }
    createLogFolderAndFilesIfNotExists() {
        if (!(0, fs_1.existsSync)('./logs')) {
            (0, fs_1.mkdirSync)('./logs');
        }
        if (!(0, fs_1.existsSync)('./logs/app-exceptions.json')) {
            (0, fs_1.createWriteStream)('./logs/app-exceptions.json', { flags: 'a' });
        }
        if (!(0, fs_1.existsSync)('./logs/app-requests.json')) {
            (0, fs_1.createWriteStream)('./logs/app-requests.json', { flags: 'a' });
        }
    }
}
exports.LoggerListener = LoggerListener;
//# sourceMappingURL=logger.listener.js.map