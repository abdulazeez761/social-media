import { Injectable } from '@nestjs/common';
import { LoggedRequestI } from 'shared/interfaces/http/logged-request.interface';
import { RequestsFileWriterService } from '../file-writer/requests-file-writer.service';

@Injectable()
export class RequestsLoggerService {
  constructor(
    private readonly requestsFileWriterService: RequestsFileWriterService,
  ) {}

  logRequest(request: LoggedRequestI, response: any) {
    return this.requestsFileWriterService.writeToRequestsLogFile({
      request,
      response,
    });
  }
}
