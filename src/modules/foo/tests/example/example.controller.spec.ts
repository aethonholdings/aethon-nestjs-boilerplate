import { Test, TestingModule } from "@nestjs/testing";
import { ExampleController } from "../../endpoints/example/example.controller";
import { ExampleService } from "../../endpoints/example/example.service";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { exampleTestData } from "src/common/test-data/example.test-data";
import { MockPersistenceService } from "src/modules/persistence/tests/mocks/persistence.service.mock";
import { Example } from "src/common/classes/entities/example.entity";
import { PersistenceService } from "src/modules/persistence/services/persistence.service";
import * as dataSourceConfig from "../../../persistence/tests/mocks/datasource.config.mock";

describe("UserController", () => {
    // configurable variables
    type EntityType = Example;
    type ControllerType = ExampleController;
    const controllerTested = ExampleController;
    const typeOrmEntities = [Example];
    let testData: ExampleCreateDTO[];

    let persistenceService: MockPersistenceService<EntityType>;
    let controller: ExampleController;

    beforeEach(async () => {
        persistenceService = new MockPersistenceService<EntityType>();
        const module: TestingModule = await Test.createTestingModule({
            imports: dataSourceConfig.getImports(typeOrmEntities),
            controllers: [ExampleController],
            providers: [
                ExampleService,
                {
                    provide: PersistenceService,
                    useValue: persistenceService
                }
            ]
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
            let flag: boolean = true;
            for (const key in result) {
                if (key !== "id" && result[key] !== example[key]) flag = false;
            }
            expect(flag).toBe(true);
        });
    });

    it("should find one", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        const created = await controller.create(example);
        await controller.findOne(created.id).then((result) => {
            expect(result).toBeDefined();
            let flag: boolean = true;
            for (const key in result) {
                if (result[key] !== created[key]) flag = false;
            }
            expect(flag).toBe(true);
        });
    });

    it("should find all", async () => {
        await Promise.all(
            testData.map(async (example) => {
                return await controller.create(example);
            })
        );
        await controller.findAll({ path: "test" }).then((results) => {
            expect(results).toBeDefined();
            expect(results.data).toBeDefined();
            expect(results.data.length).toEqual(testData.length);
            for (const testEntity of testData) {
                const entity = results.data.find((result) => {
                    let found: number = 1;
                    for (const key in result) {
                        if (key !== "id" && result[key] !== testEntity[key]) found = found * 0;
                    }
                    return found ? true : false;
                });
                expect(entity).toBeDefined();
            }
        });
    });

    it("should update", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        const updatedUser = { ...example, firstName: "Updated" };
        const created = await controller.create(example);
        await controller.update(created.id, updatedUser).then((result) => {
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

    afterEach(async () => {
        persistenceService.clearData();
    });
});
