export const mockExecutionContext = () => {
    return {
        switchToHttp: jest.fn().mockReturnValue({}),
        getRequest: jest.fn().mockReturnValue({})
    };
};
