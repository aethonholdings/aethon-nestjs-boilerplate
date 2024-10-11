import { LoggingInterceptor } from "src/common/interceptors/logging/logging.interceptor";

describe("LoggingInterceptor", () => {
    it("should be defined", () => {
        expect(new LoggingInterceptor()).toBeDefined();
    });
});
