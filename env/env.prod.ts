export default () => ({
    dev: false,
    port: 3000,
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
        synchronize: false,
        logging: false
    }
});
