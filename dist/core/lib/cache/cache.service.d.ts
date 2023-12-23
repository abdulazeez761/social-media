import { Cache } from 'cache-manager';
import { Field } from './types/field.type';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    set(key: string, value: object | string, ttl?: number): Promise<void>;
    get<CacheObjectI>(key: string): Promise<CacheObjectI | undefined>;
    del(key: string): Promise<void>;
    deleteField(key: string, field: Field): Promise<void>;
    getField(key: string, field: Field): Promise<string>;
}
