import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import environment from "../../../env/env";
import { DatabaseService } from "./services/database.service";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...environment().db,
            entities: [__dirname + "/../../common/entities/**/*.entity{.ts,.js}"]
        } as TypeOrmModuleOptions)
    ],
    providers: [DatabaseService]
})
export class DatabaseModule {}
