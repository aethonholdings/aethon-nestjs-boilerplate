import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import environment from "../../../env/env";

@Module({
    imports: [TypeOrmModule.forRoot({
        ...environment().db,
        entities: [__dirname  + "./entities/**/*.entity{.ts,.js}"],
    } as TypeOrmModuleOptions)]
    
})
export class DatabaseModule {}
