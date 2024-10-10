import path from "path";

export default () => ({
    root: {
        dev: true,
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
        synchronize: true,
        logging: false
    },
    logger: ["fatal", "error", "warn", "log", "debug", "verbose"]
});
