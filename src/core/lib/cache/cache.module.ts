import { DynamicModule, Global, Module } from '@nestjs/common';
import { CacheModule as NestJSCacheModule } from '@nestjs/cache-manager';
import { cacheManagerOptions } from 'src/shared/config/app.options';
import { CacheService } from './cache.service';

@Global()
@Module({})
export class CacheModule {
    static register(_storeName: string): DynamicModule {
        return {
            providers: [CacheService],
            imports: [NestJSCacheModule.registerAsync(cacheManagerOptions)],
            exports: [CacheService],
            module: CacheModule,
        }
    }

}