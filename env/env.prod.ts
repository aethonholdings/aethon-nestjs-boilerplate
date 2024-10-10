export default () => ({
    root: {
        dev: false,
        port: 3000
    },
    api: {
        version: "0.1",
        title: "Aethon NestJS boilerplate",
        description: "The Aethon NestJS boilerplate API",
        path: "api",
        jsonPath: "json"
    },
    db: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "NuckyThompson123",
        database: "test",
        synchronize: false,
        logging: false
    },
    logger: ["fatal", "error", "warn"]
});
