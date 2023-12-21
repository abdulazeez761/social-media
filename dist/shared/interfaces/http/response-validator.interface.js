"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResponseFromService = void 0;
const common_1 = require("@nestjs/common");
function isResponseFromService(responseFromService) {
    if (!responseFromService) {
        throw new common_1.HttpException('Response from service is falsy', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (typeof responseFromService.message !== 'string') {
        throw new common_1.HttpException('Response message must be a string', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!responseFromService.data) {
        throw new common_1.HttpException('Response data must be provided', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!(responseFromService.httpStatus in common_1.HttpStatus)) {
        throw new common_1.HttpException('Response HttpStatus is incorrect', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.isResponseFromService = isResponseFromService;
//# sourceMappingURL=response-validator.interface.js.map