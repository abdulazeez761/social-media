import { LoggedRequestI } from 'shared/interfaces/http/logged-request.interface';
import { RequestsFileWriterService } from '../file-writer/requests-file-writer.service';
export declare class RequestsLoggerService {
    private readonly requestsFileWriterService;
    constructor(requestsFileWriterService: RequestsFileWriterService);
    logRequest(request: LoggedRequestI, response: any): void;
}
