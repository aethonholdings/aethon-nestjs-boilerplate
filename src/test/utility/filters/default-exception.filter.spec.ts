import { DefaultExceptionFilter } from "src/common/filters/default-exception/default-exception.filter";

describe("DefaultExceptionFilter", () => {
    it("should be defined", () => {
        expect(new DefaultExceptionFilter()).toBeDefined();
    });
});
