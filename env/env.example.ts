export default () => ({
    dev: true,
    port: 3000,
    api: {
        version: "0.1"
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
    }
});
