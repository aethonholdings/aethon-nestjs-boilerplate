import { Module } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import environment from "../../../env/env";

@Module({
    imports: [TypeOrmModule.forRoot({
        ...environment().db,
        entities: [__dirname  + "/../**/*.entity{.ts,.js}"],
    } as TypeOrmModuleOptions)]
    
})
export class DatabaseModule {}
