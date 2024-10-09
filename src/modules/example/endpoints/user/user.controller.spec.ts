import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { User } from "src/common/entities/user.entity";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { userTestData } from "src/common/test-data/user/user.test-data";
import { UserService } from "./user.service";
import { DataSource } from "typeorm";
import { UserCreateDTO } from "src/common/dto/user/user.create.dto";

describe("UserController", () => {
    let controller: UserController;
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
    let testData: UserCreateDTO[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(dbOptions), TypeOrmModule.forFeature([User])],
            controllers: [UserController],
            providers: [UserService]
        }).compile();
        controller = module.get<UserController>(UserController);
        dataSource = module.get<DataSource>(DataSource);
        testData = userTestData;
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("Should create", async () => {
        let user = JSON.parse(JSON.stringify(testData[0]));
        await controller.create(user).then((result) => {
            expect(result).toBeDefined();
            expect(result.firstName).toEqual(user.firstName);
            expect(result.lastName).toEqual(user.lastName);
            expect(result.isActive).toEqual(user.isActive);
            return result;
        });
    });

    it("Should find one", async () => {
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

    it("Should find all", async () => {
        await Promise.all(
            testData.map(async (user) => {
                return await controller.create(user);
            })
        );
        await controller.findAll().then((result) => {
            expect(result).toBeDefined();
            expect(result.data).toBeDefined();
            expect(result.data.length).toEqual(testData.length);
            return result;
        });
    });

    it("Should update", async () => {
        let user = JSON.parse(JSON.stringify(testData[0]));
        let updatedUser = { ...user, firstName: "Updated" };
        let created = await controller.create(user);
        await controller.update(created.id, updatedUser).then((result) => {
            expect(result).toBeDefined();
            expect(result.firstName).toEqual(updatedUser.firstName);
            expect(result.lastName).toEqual(updatedUser.lastName);
            expect(result.isActive).toEqual(updatedUser.isActive);
            return result;
        });
    });

    it("Should delete", async () => {
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
