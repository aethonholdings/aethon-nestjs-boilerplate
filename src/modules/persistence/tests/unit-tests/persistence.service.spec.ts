import { Test, TestingModule } from "@nestjs/testing";
import { PersistenceService } from "../../services/persistence.service";
import { DatabaseService } from "../../services/database.service";
import { Example } from "src/common/classes/entities/example.entity";
import { LessThan } from "typeorm";
import { exampleTestData } from "src/common/test-data/example.test-data";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { CachingService } from "../../services/caching.service";
import { CacheModule } from "@nestjs/cache-manager";
import * as databaseConfig from "../mocks/data-source.config.mock";
import * as utils from "src/common/utils/utils";
import * as cacheConfig from "../mocks/cache.config.mock";
import { RedisClientOptions } from "redis";
import { Paginator } from "aethon-nestjs-paginate";
import { examplePaginateConfig } from "src/modules/foo/endpoints/example/example.paginate-config";

describe("PersistenceService", () => {
    let service: PersistenceService;
    let testData: any[];
    const tests: { entity: EntityClassOrSchema; data: any[] }[] = [
        {
            entity: Example,
            data: exampleTestData
        }
    ];

    for (const test of tests) {
        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    CacheModule.register<RedisClientOptions>(cacheConfig.getConfig()),
                    ...databaseConfig.getImports([test.entity])
                ],
                providers: [
                    PersistenceService,
                    DatabaseService,
                    CachingService
                ]
            }).compile();
            service = module.get<PersistenceService>(PersistenceService);
            let cachingService: CachingService = module.get<CachingService>(CachingService);
            await cachingService.flush();
            testData = test.data;
        });

        it("should create", async () => {
            const example = JSON.parse(JSON.stringify(testData[0]));
            await service.create(test.entity, example).then((result) => {
                expect(result).toEqual(example);
            });
        });

        it("should find one", async () => {
            const example = JSON.parse(JSON.stringify(testData[0]));
            const created = await service.create(test.entity, example);
            await service.findOne(test.entity, { where: { id: created.id } }).then((result) => {
                expect(result).toEqual(created);
            });
        });

        it("should find all", async () => {
            let created = await Promise.all(
                testData.map(async (example) => {
                    return await service.create(test.entity, example);
                })
            );
            created = created.sort((a, b) => a.id - b.id);
            await service.findAll(test.entity, {}).then((results) => {
                results = JSON.parse(JSON.stringify(results));
                results = results.sort((a, b) => a.id - b.id);
                expect(results).toEqual(created);
            });
        });

        it("should find all, paginated", async () => {
            let created = await Promise.all(
                testData.map(async (example) => {
                    return await service.create(test.entity, example);
                })
            );
            created = created.sort((a, b) => a.id - b.id);

            await service.findAllPaginated(test.entity, new Paginator(examplePaginateConfig, {}, "http://foo/")).then((results) => {
                expect(results).toBeDefined();
                expect(results.data).toBeDefined();
                results.data = JSON.parse(JSON.stringify(results.data));
                results.data = results.data.sort((a, b) => a.id - b.id);
                expect(results.data).toEqual(created);
            });
        });

        it("should update", async () => {
            const example = JSON.parse(JSON.stringify(testData[0]));
            const updatedExample = { ...example, firstName: "Updated" };
            const created = await service.create(test.entity, example);
            await service.update(test.entity, created.id, updatedExample).then((result) => {
                expect(result).toBeNull();
            });
        });

        it("should delete", async () => {
            const example = testData[0];
            const created = await service.create(test.entity, example);
            await service.delete(test.entity, created.id).then((result) => {
                expect(result).toBeNull();
            });
        });

        it("should run query", async () => {
            let created = await Promise.all(
                testData.map(async (example) => {
                    return await service.create(test.entity, example);
                })
            );
            created = created.sort((a, b) => a.id - b.id);
            const query = service
                .getQueryBuilder(test.entity)
                .select()
                .where({ id: LessThan(created[1].id) });
            await service.runQuery(query).then((results) => {
                results = results.sort((a, b) => a.id - b.id);
                expect(results).toBeDefined();
                expect(results.length).toBeGreaterThan(0);
                results.forEach((result, i) => {
                    expect(result.id).toBe(created[i].id);
                });
            });
        });
    }

    it("should set a cache value", async () => {
        const key = utils.getKey(["test", "key"]);
        const data = { test: "data" };
        await service.createInCache(key, data).then((result) => {
            expect(result).toBeDefined();
            expect(result.key).toBe(key);
            expect(result.data).toEqual(data);
        });
        await service.deleteInCache(key);
    });

    it("should get a cache value", async () => {
        const key = utils.getKey(["test", "key"]);
        const data = { test: "data" };
        await service.createInCache(key, data);        
        await service.findOneInCache(key).then((result) => {
            expect(result).toBeDefined();
            expect(result.key).toBe(key);
            expect(result.data).toEqual(data);
        });
        await service.deleteInCache(key);
    });

    afterEach(async () => {
        // Need to reset the client otherwise the test hangs; but cannot get a handle to the Redis client
        // from the CacheManager, the relevant methods are not exported in the module
    });
});
