// exports a mock of the DatabaseService class to use in Jest tests
export default () => {
    return {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };
};
