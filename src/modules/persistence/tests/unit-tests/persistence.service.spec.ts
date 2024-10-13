import { Test, TestingModule } from "@nestjs/testing";
import { PersistenceService } from "../../services/persistence.service";
import { DatabaseService } from "../../services/database.service";
import { Example } from "src/common/classes/entities/example.entity";
import { DataSource } from "typeorm";
import { exampleTestData, paginateConfig } from "src/common/test-data/example.test-data";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { CachingService } from "../../services/caching.service";
import { CACHE_MANAGER, Cache, CacheModule } from "@nestjs/cache-manager";
import { RedisClientOptions } from "redis";
import * as databaseConfig from "../mocks/datasource.config.mock";
import * as cacheConfig from "../mocks/cache.config.mock";

describe("PersistenceService", () => {
    let service: PersistenceService;
    let dataSource: DataSource;
    let cacheManager: Cache;
    let testData: any[];
    const tests: { entity: EntityClassOrSchema; data: any[] }[] = [
        {
            entity: Example,
            data: exampleTestData
        }
    ];
    const cacheConfigs = [
        { cached: true, cache: true },
        { cached: false, cache: true },
        { cached: true, cache: false },
        { cached: false, cache: false }
    ];

    for (const test of tests) {
        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...databaseConfig.getImports([test.entity]),
                    CacheModule.register<RedisClientOptions>(cacheConfig.getConfig())
                ],
                providers: [PersistenceService, DatabaseService, CachingService]
            }).compile();
            dataSource = module.get<DataSource>(DataSource);
            service = module.get<PersistenceService>(PersistenceService);
            cacheManager = module.get(CACHE_MANAGER);
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
                testData
                    .map(async (example) => {
                        return await service.create(test.entity, example);
                    })
                    .sort()
            );
            created = created.sort((a, b) => a.id - b.id);
            await service.findAll(test.entity, {}).then((results) => {
                results = JSON.parse(JSON.stringify(results));
                results = results.sort((a, b) => a.id - b.id);
                expect(results).toEqual(created);
            });
        });

        for(let cacheConfig of cacheConfigs) {
            it(`should find all, paginated - cacheConfig:${JSON.stringify(cacheConfig)}`, async () => {
                let created = await Promise.all(
                    testData.map(async (example) => {
                        return await service.create(test.entity, example);
                    })
                );
                created = created.sort((a, b) => a.id - b.id);
            
                await service.findAllPaginated(test.entity, { path: "test" }, paginateConfig, cacheConfig).then((results) => {
                    expect(results).toBeDefined();
                    expect(results.data).toBeDefined();
                    results.data = JSON.parse(JSON.stringify(results.data));
                    results.data = results.data.sort((a, b) => a.id - b.id);
                    expect(results.data).toEqual(created);
                });
            })
        };

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
    }

    afterEach(async () => {
        await dataSource.destroy();
        await cacheManager.reset();
    });
});
