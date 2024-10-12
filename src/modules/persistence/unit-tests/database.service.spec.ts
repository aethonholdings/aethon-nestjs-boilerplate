import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseService } from "../services/database.service";
import { DataSource } from "typeorm";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { Example } from "src/common/classes/entities/example.entity";
import { exampleTestData, paginateConfig } from "src/common/test-data/example.test-data";
import * as databaseConfig from "../mocks/database.config.mock";

describe("DatabaseService", () => {
    let service: DatabaseService;
    let dataSource: DataSource;
    let testData: ExampleCreateDTO[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: databaseConfig.getImports([Example]),
            providers: [DatabaseService]
        }).compile();
        dataSource = module.get<DataSource>(DataSource);
        service = module.get<DatabaseService>(DatabaseService);
        testData = exampleTestData;
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        await service.create(Example, example).then((result) => {
            expect(result).toBeDefined();
            expect(result.firstName).toEqual(example.firstName);
            expect(result.lastName).toEqual(example.lastName);
            expect(result.isActive).toEqual(example.isActive);
            return result;
        });
    });

    it("should find one", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        const created = await service.create(Example, example);
        await service.findOne(Example, { where: { id: created.id } }).then((result) => {
            expect(result).toBeDefined();
            expect(result.firstName).toEqual(example.firstName);
            expect(result.lastName).toEqual(example.lastName);
            expect(result.isActive).toEqual(example.isActive);
            return result;
        });
    });

    it("should find all", async () => {
        await Promise.all(
            testData.map(async (example) => {
                return await service.create(Example, example);
            })
        );
        await service.findAll(Example, { path: "test" }, paginateConfig).then((result) => {
            expect(result).toBeDefined();
            expect(result.data).toBeDefined();
            expect(result.data.length).toEqual(testData.length);
            return result;
        });
    });

    it("should update", async () => {
        const example = JSON.parse(JSON.stringify(testData[0]));
        const updatedExample = { ...example, firstName: "Updated" };
        const created = await service.create(Example, example);
        await service.update(Example, created.id, updatedExample).then((result) => {
            expect(result).toBeNull();
            return result;
        });
    });

    it("should delete", async () => {
        const example = testData[0];
        const created = await service.create(Example, example);
        await service.delete(Example, created.id).then((result) => {
            expect(result).toBeNull();
            return result;
        });
    });

    afterEach(async () => {
        await dataSource.destroy();
    });
});
