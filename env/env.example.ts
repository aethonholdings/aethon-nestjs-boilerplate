export default () => ({
    root: {
        dev: true,
        port: 3000,
        prefix: "api"
    },
    api: [{
        version: "0.1",
        title: "Aethon NestJS boilerplate",
        description: "The Aethon NestJS boilerplate API",
        path: "swagger",
        jsonPath: "swagger/json"
    }],
    redis: {
        url: "redis://***.***.***.***:6379",
        ttl: 60
    },
    db: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "***",
        password: "******",
        database: "boilerplate",
        synchronize: false,
        logging: false
    },
    logger: ["fatal", "error", "warn", "log", "debug", "verbose"]
});
