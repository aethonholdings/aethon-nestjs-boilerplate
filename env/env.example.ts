export default () => ({
    root: {
        dev: true,
        port: 3000
    },
    api: {
        version: "0.1",
        title: "Aethon NestJS boilerplate",
        description: "The Aethon NestJS boilerplate API"
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
