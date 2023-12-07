"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheManagerOptions = exports.jwtOptions = void 0;
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
exports.jwtOptions = {
    global: true,
    secret: "@AA@23&^D^*&^&DWA^&D^A&D^&SD()()*-989daw>++++_+A1123djakwjdawdja213_AccessToken"
};
exports.cacheManagerOptions = {
    useFactory: async () => ({
        store: cache_manager_redis_yet_1.redisStore,
        socket: {
            host: 'localhost',
            port: 6379,
            tls: false,
        },
    }),
};
//# sourceMappingURL=app.options.js.map