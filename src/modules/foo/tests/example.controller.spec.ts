import { Test, TestingModule } from "@nestjs/testing";
import { ExampleController } from "../endpoints/example/example.controller";
import { ExampleService } from "../endpoints/example/example.service";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { exampleTestData } from "src/common/test-data/example.test-data";
import * as dataSourceConfig from "../../persistence/mocks/datasource.config.mock";
import { MockPersistenceService } from "src/modules/persistence/mocks/persistence.service.mock";
import { Example } from "src/common/classes/entities/example.entity";
import { PersistenceService } from "src/modules/persistence/services/persistence.service";

describe("UserController", () => {
    let controller: ExampleController;
    let testData: ExampleCreateDTO[];
    let persistenceService: MockPersistenceService<Example>;

    beforeEach(async () => {
        persistenceService = new MockPersistenceService<Example>();
        const module: TestingModule = await Test.createTestingModule({
            imports: dataSourceConfig.getImports([Example]),
            controllers: [ExampleController],
            providers: [
                ExampleService,
                {
                    provide: PersistenceService,
                    useValue: persistenceService
                }
            ]
        }).compile();
        controller = module.get<ExampleController>(ExampleController);
        testData = exampleTestData;
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should create", async () => {
        const user = JSON.parse(JSON.stringify(testData[0]));
        await controller.create(user).then((result) => {
            expect(result).toBeDefined();
            expect(result.firstName).toEqual(user.firstName);
            expect(result.lastName).toEqual(user.lastName);
            expect(result.isActive).toEqual(user.isActive);
            return result;
        });
    });

    it("should find one", async () => {
        const user = JSON.parse(JSON.stringify(testData[0]));
        const created = await controller.create(user);
        await controller.findOne(created.id).then((result) => {
            expect(result).toBeDefined();
            expect(result.firstName).toEqual(user.firstName);
            expect(result.lastName).toEqual(user.lastName);
            expect(result.isActive).toEqual(user.isActive);
            return result;
        });
    });

    it("should find all", async () => {
        await Promise.all(
            testData.map(async (user) => {
                return await controller.create(user);
            })
        );
        await controller.findAll({ path: "test" }).then((result) => {
            expect(result).toBeDefined();
            expect(result.data).toBeDefined();
            expect(result.data.length).toEqual(testData.length);
            return result;
        });
    });

    it("should update", async () => {
        const user = JSON.parse(JSON.stringify(testData[0]));
        const updatedUser = { ...user, firstName: "Updated" };
        const created = await controller.create(user);
        await controller.update(created.id, updatedUser).then((result) => {
            expect(result).toBeNull();
            return result;
        });
    });

    it("should delete", async () => {
        const user = testData[0];
        const created = await controller.create(user);
        await controller.delete(created.id).then((result) => {
            expect(result).toBeNull();
            return result;
        });
    });

    afterEach(async () => {
        persistenceService.clearData();
    });
});
