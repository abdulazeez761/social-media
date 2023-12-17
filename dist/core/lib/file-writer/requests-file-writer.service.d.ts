import { RequestsFileEntryI } from 'shared/interfaces/http/requests-file-entry.interface';
export declare class RequestsFileWriterService {
    private get requestsLogFilePath();
    writeToRequestsLogFile(requestsFileEntry: RequestsFileEntryI): void;
}
