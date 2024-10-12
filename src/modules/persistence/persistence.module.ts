import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import environment from "../../../env/env";
import { PersistenceService } from "./services/persistence.service";
import { DatabaseService } from "./services/database.service";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...environment().db,
            entities: [__dirname + "/../../common/classes/entities/**/*.entity{.ts,.js}"]
        } as TypeOrmModuleOptions)
    ],
    providers: [PersistenceService, DatabaseService],
    exports: [PersistenceService]
})
export class PersistenceModule {}
