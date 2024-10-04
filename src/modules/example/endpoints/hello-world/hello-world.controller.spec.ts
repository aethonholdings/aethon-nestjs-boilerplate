import { Test, TestingModule } from "@nestjs/testing";
import { HelloWorldController } from "./hello-world.controller";
import { HelloWorldService } from "./hello-world.service";
import { ConfigService } from "@nestjs/config";
import { helloResponse } from "./hello-world.test-data";

describe("Hello World Controller", () => {
    let appController: HelloWorldController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [HelloWorldController],
            providers: [
                HelloWorldService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            return helloResponse[key];
                        })
                    }
                }
            ]
        }).compile();

        appController = app.get<HelloWorldController>(HelloWorldController);
    });

    describe("root", () => {
        it('should return test API response', () => {
            const hello = appController.getHello();
            expect(hello.dev).toBe(helloResponse.dev);
        });
    });
});
