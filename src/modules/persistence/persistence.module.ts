import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import environment from "../../../env/env";
import { PersistenceService } from "./services/persistence.service";
import { DatabaseService } from "./services/database.service";
import { CacheModule } from "@nestjs/cache-manager";
import { CachingService } from './services/caching.service';
import { RedisClientOptions } from "redis";

const redisStore = require('cache-manager-redis-store').redisStore;

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...environment().db,
            entities: [__dirname + "/../../common/classes/entities/**/*.entity{.ts,.js}"]
        } as TypeOrmModuleOptions),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: environment().redis.url,
            isGlobal: true
        })
    ],
    providers: [PersistenceService, DatabaseService, CachingService],
    exports: [PersistenceService]
})
export class PersistenceModule {}
