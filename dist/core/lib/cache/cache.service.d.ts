import { Cache } from 'cache-manager';
import { Field } from './types/field.type';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    set(key: string, value: object | string, ttl?: number): void;
    get<T>(key: string): Promise<T>;
    deleteField(key: string, field: Field): Promise<void>;
    deleteUserFromCache(key: string): Promise<void>;
    getField(key: string, field: Field): Promise<string>;
}
