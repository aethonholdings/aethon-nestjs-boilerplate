import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { FindOneOptions, ObjectLiteral } from "typeorm";

@Injectable()
export class CachingService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async get(options: FindOneOptions): Promise<ObjectLiteral> {
        return this.cacheManager.get(options.where["id"]?.toString());
    }

    async set(key: string, dto: any): Promise<boolean> {
        await this.cacheManager.set(key, dto);
        return true;
    }

    async delete(key: string): Promise<boolean> {
        await this.cacheManager.del(key);
        return null;
    }
}
