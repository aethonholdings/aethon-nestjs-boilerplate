import { Test, TestingModule } from "@nestjs/testing";
import { ExampleController } from "../../endpoints/example/example.controller";
import { ExampleService } from "../../endpoints/example/example.service";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { exampleTestData } from "src/common/test-data/example.test-data";
import { Example } from "src/common/classes/entities/example.entity";
import { PersistenceService } from "src/modules/persistence/services/persistence.service";
import * as databaseConfig from "../../../persistence/tests/mocks/data-source.config.mock";
import * as cacheConfig from "../../../persistence/tests/mocks/cache.config.mock";
import { CacheModule } from "@nestjs/cache-manager";
import { RedisClientOptions } from "redis";
import { DatabaseService } from "src/modules/persistence/services/database.service";
import { CachingService } from "src/modules/persistence/services/caching.service";
import { Paginator } from "aethon-nestjs-paginate";
import { examplePaginateConfig } from "../../endpoints/example/example.paginate-config";

describe("UserController", () => {
    // configurable variables
    type ControllerType = ExampleController;
    const controllerTested = ExampleController;
    const typeOrmEntities = [Example];
    const updateExample = { firstName: "Updated" };

    let testData: ExampleCreateDTO[];
    let controller: ControllerType;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register<RedisClientOptions>(cacheConfig.getConfig()),
                ...databaseConfig.getImports(typeOrmEntities)
            ],
            controllers: [ExampleController],
            providers: [ExampleService, PersistenceService, DatabaseService, CachingService]
        }).compile();
        controller = module.get<ControllerType>(controllerTested);
        testData = exampleTestData;
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should create", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        await controller.create(example).then((result) => {
            expect(result).toBeDefined();
            delete result.id;
            expect(result).toEqual(example);
        });
    });

    it("should find one", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        const created = await controller.create(example);
        await controller.findOne(created.id).then((result) => {
            expect(result).toEqual(created);
        });
    });

    it("should find all", async () => {
        let created = await Promise.all(
            testData.map(async (example) => {
                return await controller.create(example);
            })
        );
        created = created.sort((a, b) => a.id - b.id);
        await controller.findAll(new Paginator(examplePaginateConfig, {}, "http://foo/")).then((results) => {
            results = JSON.parse(JSON.stringify(results));
            results.data = results.data.sort((a, b) => a.id - b.id);
            expect(results.data).toEqual(created);
        });
    });

    it("should update", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        const created = await controller.create(example);
        const updated = { ...example, ...updateExample };
        await controller.update(created.id, updated).then((result) => {
            expect(result).toBeNull();
        });
    });

    it("should delete", async () => {
        const example = testData[0];
        const created = await controller.create(example);
        await controller.delete(created.id).then((result) => {
            expect(result).toBeNull();
        });
    });

    afterEach(async () => {});
});
