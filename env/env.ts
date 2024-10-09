export default () => ({
    root: {
        dev: true,
        port: 3000,
        logger: ["fatal", "error", "warn", "log", "debug", "verbose"]
    },
    api: {
        version: "0.1"
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
    }
});
