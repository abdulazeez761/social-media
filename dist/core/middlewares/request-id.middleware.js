"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestIdMiddleware = void 0;
const common_1 = require("@nestjs/common");
const cuid2_1 = require("@paralleldrive/cuid2");
const general_constant_1 = require("../../shared/constants/general.constant");
const requestID_generator_util_1 = require("../../shared/util/requestID-generator.util");
let RequestIdMiddleware = class RequestIdMiddleware {
    use(req, res, next) {
        const requestID = req.header(general_constant_1.REQUEST_ID_TOKEN_HEADER);
        const authorization = req.headers.authorization;
        const date = new Date().toUTCString();
        const isTokenOrEmail = authorization
            ? authorization?.split(' ')[1]
            : req.body.email;
        if (!isTokenOrEmail) {
            if (!req.headers[general_constant_1.REQUEST_ID_TOKEN_HEADER] ||
                (requestID && !(0, cuid2_1.isCuid)(requestID)))
                req.headers[general_constant_1.REQUEST_ID_TOKEN_HEADER] = (0, cuid2_1.createId)();
            res.set(general_constant_1.REQUEST_ID_TOKEN_HEADER, req.headers[general_constant_1.REQUEST_ID_TOKEN_HEADER]);
            return next();
        }
        const generatedID = (0, requestID_generator_util_1.requestIdGenerator)(date, isTokenOrEmail);
        if (!req.headers[general_constant_1.REQUEST_ID_TOKEN_HEADER] ||
            (requestID && !(0, cuid2_1.isCuid)(requestID)))
            req.headers[general_constant_1.REQUEST_ID_TOKEN_HEADER] = generatedID;
        res.set(general_constant_1.REQUEST_ID_TOKEN_HEADER, req.headers[general_constant_1.REQUEST_ID_TOKEN_HEADER]);
        next();
    }
};
exports.RequestIdMiddleware = RequestIdMiddleware;
exports.RequestIdMiddleware = RequestIdMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestIdMiddleware);
//# sourceMappingURL=request-id.middleware.js.map