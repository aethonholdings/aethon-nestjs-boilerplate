import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseService } from "../../services/database.service";
import { DataSource } from "typeorm";
import { Example } from "src/common/classes/entities/example.entity";
import { exampleTestData, paginateConfig } from "src/common/test-data/example.test-data";
import * as databaseConfig from "../mocks/datasource.config.mock";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

describe("DatabaseService", () => {
    let service: DatabaseService;
    let dataSource: DataSource;
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
                imports: databaseConfig.getImports([test.entity]),
                providers: [DatabaseService]
            }).compile();
            dataSource = module.get<DataSource>(DataSource);
            service = module.get<DatabaseService>(DatabaseService);
            testData = test.data;
        });

        it("should create", async () => {
            const example = JSON.parse(JSON.stringify(testData[0]));
            await service.create(test.entity, example).then((result) => {
                expect(result).toBeDefined();
                let flag: boolean = true;
                for (const key in result) {
                    if (result[key] !== example[key]) flag = false;
                }
                expect(flag).toBe(true);
            });
        });

        it("should find one", async () => {
            const example = JSON.parse(JSON.stringify(testData[0]));
            const created = await service.create(test.entity, example);
            await service.findOne(test.entity, { where: { id: created.id } }).then((result) => {
                expect(result).toBeDefined();
                let found: boolean = true;
                for (const key in result) {
                    if (result[key] !== created[key]) found = false;
                }
                expect(found).toBe(true);
            });
        });

        it("should find all, paginated", async () => {
            await Promise.all(
                testData.map(async (example) => {
                    return await service.create(test.entity, example);
                })
            );
            await service.findAllPaginated(test.entity, { path: "test" }, paginateConfig).then((results) => {
                expect(results).toBeDefined();
                expect(results.data).toBeDefined();
                expect(results.data.length).toEqual(testData.length);
                for (const testEntity of testData) {
                    const entity = results.data.find((result) => {
                        let found: boolean = true;
                        for (const key in result) {
                            if (key !== "id" && result[key] !== testEntity[key]) found = false;
                        }
                        return found;
                    });
                    expect(entity).toBeDefined();
                }
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
    }

    afterEach(async () => {
        await dataSource.destroy();
    });
});
