import { LoggerService as NestJSLoggerService, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerColorI } from 'shared/interfaces/general/logger-color.interface';
export declare class LoggerService implements NestJSLoggerService {
    private readonly configService;
    constructor(configService: ConfigService);
    log(message: string, context: string): void;
    error(message: string, context: string): void;
    warn(message: string, context: string): void;
    formatLog(message: string, logLevel: LogLevel, loggerColor: LoggerColorI, context: string): string;
}
