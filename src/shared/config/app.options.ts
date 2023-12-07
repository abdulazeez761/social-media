import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { JwtModuleOptions } from '@nestjs/jwt';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

export const jwtOptions: JwtModuleOptions = {
    global: true,
    secret: "@AA@23&^D^*&^&DWA^&D^A&D^&SD()()*-989daw>++++_+A1123djakwjdawdja213_AccessToken"
};

export const cacheManagerOptions: CacheModuleAsyncOptions<RedisClientOptions> =
{
    useFactory: async () => ({
        store: redisStore,
        socket: {
            host: 'localhost',
            port: 6379,
            tls: false,
        },
    }),
};
