import { Test, TestingModule } from "@nestjs/testing";
import { ExampleController } from "./example.controller";
import { Example } from "src/common/entities/example.entity";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { userTestData } from "src/common/test-data/user/user.test-data";
import { ExampleService } from "./example.service";
import { DataSource } from "typeorm";
import { ExampleCreateDTO } from "src/common/dto/example/example.create.dto";

describe("UserController", () => {
    let controller: ExampleController;
    let dbOptions = {
        type: "sqlite",
        database: ":memory:",
        entities: ["src/common/entities/*.entity.ts"],
        synchronize: true,
        dropSchema: true,
        logging: false,
        keepConnectionAlive: true
    } as TypeOrmModuleOptions;
    let dataSource: DataSource;
    let testData: ExampleCreateDTO[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(dbOptions), TypeOrmModule.forFeature([Example])],
            controllers: [ExampleController],
            providers: [ExampleService]
        }).compile();
        controller = module.get<ExampleController>(ExampleController);
        dataSource = module.get<DataSource>(DataSource);
        testData = userTestData;
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should create", async () => {
        let user = JSON.parse(JSON.stringify(testData[0]));
        await controller.create(user).then((result) => {
            expect(result).toBeDefined();
            expect(result.firstName).toEqual(user.firstName);
            expect(result.lastName).toEqual(user.lastName);
            expect(result.isActive).toEqual(user.isActive);
            return result;
        });
    });

    it("should find one", async () => {
        let user = JSON.parse(JSON.stringify(testData[0]));
        let created = await controller.create(user);
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
        let user = JSON.parse(JSON.stringify(testData[0]));
        let updatedUser = { ...user, firstName: "Updated" };
        let created = await controller.create(user);
        await controller.update(created.id, updatedUser).then((result) => {
            expect(result).toBeNull();
            return result;
        });
    });

    it("should delete", async () => {
        let user = testData[0];
        let created = await controller.create(user);
        await controller.delete(created.id).then((result) => {
            expect(result).toBeNull();
            return result;
        });
    });

    afterEach(async () => {
        await dataSource.destroy();
    });
});
