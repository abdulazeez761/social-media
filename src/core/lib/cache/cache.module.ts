import { DynamicModule, Global, Module } from '@nestjs/common';
import { CacheModule as NestJSCacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { cacheManagerOptions } from 'shared/configs/app.option';

@Global()
@Module({})
export class CacheModule {
  static register(_storeName: string): DynamicModule {
    return {
      providers: [CacheService],
      imports: [NestJSCacheModule.registerAsync(cacheManagerOptions)],
      exports: [CacheService],
      module: CacheModule,
    };
  }
}
