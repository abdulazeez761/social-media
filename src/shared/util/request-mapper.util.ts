import { RequestMethod } from '@nestjs/common';
import { REQUEST_ID_TOKEN_HEADER } from 'shared/constants/general.constant';
import { DynamicObjectI } from 'shared/interfaces/general/dynamic-object.interface';
import { LoggedRequestI } from 'shared/interfaces/http/logged-request.interface';
import { RequestI } from 'shared/interfaces/http/request.interface';

export const requestMapper = (request: RequestI) => {
  const { params, path, query, headers, body, method } = request;

  const mappedRequest: LoggedRequestI = {
    id: headers[REQUEST_ID_TOKEN_HEADER]!,
    path,
    body,
    token: (headers.authorization ?? 'Bearer ').split(' ')[1],
    lang: headers['accept-language'] ?? 'en',
    queryParams: query,
    routeParams: params,
    method: (RequestMethod as DynamicObjectI)[method],
  };

  return mappedRequest;
};
