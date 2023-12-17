import { ExceptionI } from 'shared/interfaces/http/exception.interface';
import { ExceptionsFileWriterService } from '../file-writer/exceptions-file-writer.service';
export declare class ExceptionsLoggerService {
    private readonly exceptionsFileWriterService;
    constructor(exceptionsFileWriterService: ExceptionsFileWriterService);
    logException(exception: ExceptionI): void;
}
