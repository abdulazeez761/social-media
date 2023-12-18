import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ModulesModule } from './modules/modules.module';
import { CacheModule } from './core/lib/cache/cache.module';
import { I18nModule } from 'nestjs-i18n';
import { LoggerModule } from 'core/lib/logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobModule } from 'core/lib/cron-job/cron-job.module';
import { ConfigModule } from '@nestjs/config';
import { interceptors, guards, filters } from 'shared/configs/app.config';
import {
  configOptions,
  i18nOptions,
  jwtOptions,
} from 'shared/configs/app.option';
import { RequestIdMiddleware } from 'core/middlewares/request-id.middleware';
import helmet from 'helmet';

CacheModule;
@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    LoggerModule,
    ScheduleModule.forRoot(),
    I18nModule.forRoot(i18nOptions),
    CronJobModule,
    JwtModule.registerAsync(jwtOptions),
    CacheModule.register('cache-manager-redis-yet'),
    ModulesModule,
  ],
  controllers: [],
  providers: [...interceptors, ...guards, ...filters],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), RequestIdMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
