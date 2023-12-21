import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Field } from './types/field.type';
import { CacheObjectI } from '../../../shared/interfaces/general/cache-object.interface';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  set(key: string, value: object | string, ttl?: number) {
    return this.cacheManager.set(key, value, ttl);
  }

  get<CacheObjectI>(key: string) {
    return this.cacheManager.get<CacheObjectI>(key);
  }

  async deleteField(key: string, field: Field) {
    const keyFromCache = await this.get<CacheObjectI>(key);
    if (!keyFromCache)
      throw new HttpException(
        'Field ' + field + ' Does not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    delete keyFromCache[field];
    return this.set(key, keyFromCache);
  }

  deleteUserFromCache(key: string) {
    return this.cacheManager.del(key);
  }

  async getField(key: string, field: Field) {
    const userFromCache = await this.get<CacheObjectI>(key);
    if (!userFromCache)
      throw new HttpException(
        'Field ' + field + ' Does not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return userFromCache[field];
  }
}
