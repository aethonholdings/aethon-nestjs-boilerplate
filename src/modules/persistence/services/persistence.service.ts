import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { EntityTarget, FindOneOptions, ObjectLiteral } from "typeorm";
import { DatabaseService } from "./database.service";
import { CachingService } from "./caching.service";
import { Cacheable, CacheOptions } from "src/common/types/types";

@Injectable()
export class PersistenceService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly cachingService: CachingService
    ) {}

    async findAll(entity: EntityTarget<ObjectLiteral>, options: FindOneOptions): Promise<ObjectLiteral[]> {
        return this.databaseService.findAll(entity, options);
    }

    findAllPaginated<T>(
        entity: EntityTarget<ObjectLiteral>,
        query: PaginateQuery,
        paginateConfig: PaginateConfig<T>,
        cacheOptions: CacheOptions = { cached: false, cache: false }
    ): Promise<Paginated<ObjectLiteral>> {
        const key: string = this._formatKey(
            `findAllPaginated:${entity.toString()}:${JSON.stringify(query)}:${JSON.stringify(paginateConfig)}`
        );
        return this._fetch(key, this.databaseService.findAllPaginated(entity, query, paginateConfig), cacheOptions);
    }

    async findOne(entity: EntityTarget<ObjectLiteral>, options: FindOneOptions): Promise<ObjectLiteral> {
        return this.databaseService.findOne(entity, options);
    }

    async create(entity: EntityTarget<ObjectLiteral>, dto: any): Promise<ObjectLiteral> {
        return this.databaseService.create(entity, dto);
    }

    async update(entity: EntityTarget<ObjectLiteral>, id: number, dto: any): Promise<null> {
        // check if the object submitted has an id that is inconsistent with the id in the URL
        if (dto?.id && dto.id !== id) {
            delete dto.id;
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        }
        return this.databaseService.update(entity, id, dto);
    }

    async delete(entity: EntityTarget<ObjectLiteral>, id: number): Promise<null> {
        return this.databaseService.delete(entity, id);
    }

    async runQuery(query: string) {
        // to implement
    }

    private _fetch<T>(key: string, query: Promise<T>, cacheOptions?: CacheOptions): Promise<T> {
        if (!cacheOptions || (!cacheOptions.cache && !cacheOptions.cached)) return query;
        const dbFetch: Promise<T> = query.then((data) => {
            if (cacheOptions.cache) this.cachingService.set(key, data, cacheOptions?.ttl);
            return data;
        });
        if (cacheOptions.cached)
            return this.cachingService.get(key).then((cachable: Cacheable<T>) => {
                if (cachable) return cachable.data;
                return dbFetch;
            });
        return dbFetch;
    }

    private _write<T>(key: string, query: Promise<T>, cache: boolean): Promise<T> {
        return query.then((data) => {
            if (cache) this.cachingService.set(key, data);
            return data;
        });
    }

    private _formatKey(key: string) {
        return key
            .replace(/\r?\n|\r/g, " ")
            .replace(/\s+/g, " ")
            .replace(/ /g, "");
    }
}
