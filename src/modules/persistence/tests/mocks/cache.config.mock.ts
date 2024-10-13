import environment from "env/env";
import { CacheModuleOptions } from "@nestjs/cache-manager";
import { RedisClientOptions, RedisFunctions, RedisModules, RedisScripts } from "redis";

const store = require("cache-manager-redis-store").redisStore;

export const getConfig = (): CacheModuleOptions<RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>> => {
    return {
        store: store,
        url: environment().redis.url,
        isGlobal: true
    };
};