import { Test, TestingModule } from "@nestjs/testing";
import { CachingService } from "../../services/caching.service";
import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";
import { RedisClientOptions } from "redis";
import * as cacheConfig from "../mocks/cache.config.mock";

describe("CachingService - this test hangs because the Redis cache under the current dependencies cannot be reset", () => {
    let service: CachingService;
    let cacheManager: Cache;

    const testData = [
        { id: 1, name: "John", nested: { id: 10, nestedName: "Doe" } },
        { id: 2, name: "Jane", nested: { id: 11, nestedName: "Doe" } },
        { id: 3, name: "Jim", nested: { id: 12, nestedName: "Doe" } }
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CacheModule.register<RedisClientOptions>(cacheConfig.getConfig())],
            providers: [CachingService]
        }).compile();
        service = module.get<CachingService>(CachingService);
        cacheManager = module.get(CACHE_MANAGER);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should set and get a value", async () => {
        const example = testData[0];
        const key = JSON.stringify(`POJO:test:{ where: { id: example.id } }`);
        await service.set(key, example);
        const result = await service.get(key);
        expect(result).toEqual(example);
        await service.delete(key);
    });

    it("should delete a value", async () => {
        const example = testData[0];
        const key = JSON.stringify(`POJO:test:{ where: { id: example.id } }`);
        await service.set(key, example);
        await service.delete(key);
        const result = await service.get(key);
        expect(result).toBeNull();
    });

    afterEach(async () => {
        // cacheManager.reset() ;
    });
});
