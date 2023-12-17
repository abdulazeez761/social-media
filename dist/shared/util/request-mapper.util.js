"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestMapper = void 0;
const common_1 = require("@nestjs/common");
const requestMapper = (request) => {
    const { params, path, query, headers, body, method } = request;
    const mappedRequest = {
        path,
        body,
        token: (headers.authorization ?? 'Bearer ').split(' ')[1],
        lang: headers['accept-language'] ?? 'en',
        queryParams: query,
        routeParams: params,
        method: common_1.RequestMethod[method],
    };
    return mappedRequest;
};
exports.requestMapper = requestMapper;
//# sourceMappingURL=request-mapper.util.js.map