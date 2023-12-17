import { ExceptionI } from 'shared/interfaces/http/exception.interface';
export declare class ExceptionsFileWriterService {
    private get exceptionsLogFilePath();
    writeToExceptionsLogFile(exception: ExceptionI): void;
}
