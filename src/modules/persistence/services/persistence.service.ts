import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EntityTarget, FindOneOptions, ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { DatabaseService } from "./database.service";
import { CachingService } from "./caching.service";
import { Cacheable, CacheStrategyOptions } from "src/common/types/types";
import * as utils from "src/common/utils/utils";
import { Paginated, Paginator } from "aethon-nestjs-paginate";

@Injectable()
export class PersistenceService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly cachingService: CachingService
    ) {}

    findAll(entity: EntityTarget<ObjectLiteral>, options: FindOneOptions): Promise<ObjectLiteral[]> {
        return this.databaseService.findAll(entity, options);
    }

    findAllPaginated<T>(
        entity: EntityTarget<ObjectLiteral>,
        paginator: Paginator
    ): Promise<Paginated<ObjectLiteral>> {
        return this.databaseService.findAllPaginated(entity, paginator);
    }

    findOne(entity: EntityTarget<ObjectLiteral>, options: FindOneOptions): Promise<ObjectLiteral> {
        return this.databaseService.findOne(entity, options);
    }

    create(entity: EntityTarget<ObjectLiteral>, dto: any): Promise<ObjectLiteral> {
        return this.databaseService.create(entity, dto);
    }

    update(entity: EntityTarget<ObjectLiteral>, id: number, dto: any): Promise<null> {
        if (dto?.id) {
            // check if the object submitted has an id that is inconsistent with the id in the URL
            if (dto.id === id) {
                // if the id field exists and is consistent, delete it just to be safe
                delete dto.id;
            } else {
                // if the id field is consistent with the id param in the request, throw an error
                throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
            }
        }
        return this.databaseService.update(entity, id, dto);
    }

    delete(entity: EntityTarget<ObjectLiteral>, id: number): Promise<null> {
        return this.databaseService.delete(entity, id);
    }

    runQuery<T>(query: SelectQueryBuilder<T>, raw: boolean = false): Promise<T[]> {
        return this.databaseService.runQuery(query, raw);
    }

    getQueryBuilder<T>(entity?: EntityTarget<T>): SelectQueryBuilder<T> {
        return this.databaseService.getQueryBuilder(entity);
    }

    findOneInCache<T>(key: string): Promise<Cacheable<T>> {
        return this.cachingService.get(key);
    }

    createInCache<T>(key: string, data: T, ttl?: number): Promise<Cacheable<T>> {
        // ensure that we are not overwriting a record with a create operation
        return this.cachingService.get(key).then((cached) => {
            if (cached) throw new Error(utils.log("PersistenceService.createInCache", `Existing record found for key: ${key}`));
            return this.cachingService.set(key, data, ttl);
        });
    }

    updateInCache<T>(key: string, data: T, ttl?: number): Promise<Cacheable<T>> {
        // ensure that we are not updating a record that does not exist
        return this.cachingService.get(key).then((cached) => {
            if (!cached) throw new Error(utils.log("PersistenceService.updateInCache", `Record not found for key: ${key}`));
            return this.cachingService.set(key, data, ttl);
        });
    }

    deleteInCache(key: string): Promise<void> {
        return this.cachingService.delete(key);
    }

    private _fetch<T>(query: Promise<T>, cacheOptions: CacheStrategyOptions): Promise<T> {
        if (!cacheOptions || (!cacheOptions.cache && !cacheOptions.cached)) return query;
        const dbFetch: Promise<T> = query.then((data) => {
            if (cacheOptions.cache) this.cachingService.set(cacheOptions.key, data, cacheOptions?.ttl);
            return data;
        });
        if (cacheOptions.cached)
            return this.cachingService.get(cacheOptions.key).then((cachable: Cacheable<T>) => {
                if (cachable) return cachable.data;
                return dbFetch;
            });
        return dbFetch;
    }
}
