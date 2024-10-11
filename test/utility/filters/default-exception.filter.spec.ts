import { DefaultExceptionFilter } from "./default-exception.filter";

describe("DefaultExceptionFilter", () => {
    it("should be defined", () => {
        expect(new DefaultExceptionFilter()).toBeDefined();
    });
});
