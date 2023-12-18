"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
exports.ROUTES = {
    AUTH: {
        CONTROLLER: 'auth',
        REGISTER_USER: 'register-user',
        LOG_USER_IN: 'login-user',
        LOG_USER_OUT: 'logout-user/:userID',
    },
    USERS: {
        CONTROLLER: 'users',
        FIND_ALL: '',
        FIND_ONE: ':userID',
        UPDATE_ONE: ':userID',
        DELETE_ONE: ':userID',
    },
};
//# sourceMappingURL=routes.constant.js.map