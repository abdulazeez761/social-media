import { OnModuleInit } from '@nestjs/common';
export declare class LoggerListener implements OnModuleInit {
    onModuleInit(): void;
    createLogFolderAndFilesIfNotExists(): void;
}
