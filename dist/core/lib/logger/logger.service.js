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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const logger_colors_constant_1 = require("../../../shared/constants/logger-colors.constant");
const date_util_1 = require("../../../shared/util/date.util");
let LoggerService = class LoggerService {
    constructor(configService) {
        this.configService = configService;
    }
    log(message, context) {
        console.log(this.formatLog(message + ' ✔', 'log', logger_colors_constant_1.logColor, context));
    }
    error(message, context) {
        console.log(this.formatLog(message + ' ❗', 'error', logger_colors_constant_1.errorColor, context));
    }
    warn(message, context) {
        console.log(this.formatLog(message + ' ❓', 'warn', logger_colors_constant_1.warnColor, context));
    }
    formatLog(message, logLevel, loggerColor, context) {
        const { contextColor, messageColor } = loggerColor;
        const formattedMessage = `${messageColor}[${this.configService.get('APP_NAME')}] ${messageColor}${process.pid} - ${logger_colors_constant_1.dateColor}${(0, date_util_1.formattedDateForConsole)()}     ${messageColor}${logLevel.toUpperCase()} ${contextColor}[${context}] ${messageColor}${message}`;
        return formattedMessage;
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoggerService);
//# sourceMappingURL=logger.service.js.map