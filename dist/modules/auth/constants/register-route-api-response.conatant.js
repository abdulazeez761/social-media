"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouteApiResponse = void 0;
const common_1 = require("@nestjs/common");
exports.registerRouteApiResponse = {
    isArray: false,
    status: common_1.HttpStatus.CREATED,
    description: 'Register route that returns the created user',
    schema: {
        example: {
            data: {
                id: 0,
                username: 'mut1aq',
                email: 'Mutlaq@gmail.com',
                password: '$2b$10$S6IWbCZpTvktZwpasDmOHu0THCdxHmbxAFQDSzsdFEsJPg7.g8VUS',
                gender: 1,
                birthday: '2023-11-27T18:17:45.388Z',
            },
            httpStatus: 201,
            message: 'Successfully added a new User',
        },
    },
};
//# sourceMappingURL=register-route-api-response.conatant.js.map