import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './core/guards/access-token/access-token.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './core/Interceptors/just-for-testing.interseptor';
import { jwtOptions } from './shared/config/app.options';
import { ModulesModule } from './modules/modules.module';
import { CacheModule } from './core/lib/cache/cache.module';
CacheModule
@Module({
  imports: [
    JwtModule.register(jwtOptions),
    CacheModule.register('cache-manager-redis-yet'),
    ModulesModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AccessTokenGuard
  },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // }
  ],
})
export class AppModule { }