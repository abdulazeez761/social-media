import { LoggedRequestI } from './logged-request.interface';

export interface RequestsFileEntryI {
  request: LoggedRequestI;
  response: any;
}
