import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cacheable } from "src/common/types/types";
import env from "env/env";

@Injectable()
export class CachingService {
    private readonly _defaultTtl = env().redis.ttl;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    get<T>(key: string): Promise<Cacheable<T>> {
        return this.cacheManager.get(key);
    }

    set<T>(key: string, data: T, ttl?: number): Promise<Cacheable<T>> {
        const timestamp: number = Date.now();
        const ttlTarget: number = ttl || this._defaultTtl;
        return this.cacheManager.set(key, data, ttl).then((result) => {
            return {
                key: key,
                start: timestamp,
                end: timestamp + ttlTarget,
                ttl: ttlTarget,
                cached: false,
                data: data
            };
        });
    }

    delete(key: string): Promise<void> {
        return this.cacheManager.del(key);
    }

    flush(): Promise<void> {
        return this.cacheManager.reset();
    }
}
