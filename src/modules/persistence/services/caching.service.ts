import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { FindOneOptions, FindOptions, ObjectLiteral } from "typeorm";

@Injectable()
export class CachingService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    findAll(options: FindOptions): Promise<ObjectLiteral[]> {
        return null;
    }

    findOne(options: FindOneOptions): Promise<ObjectLiteral> {
        return null;
    }

    create(dto: any): Promise<ObjectLiteral> {
        return null;
    }

    update(id: number, dto: any): Promise<null> {
        return null;
    }

    delete(id: number): Promise<null> {
        return null;
    }
}
