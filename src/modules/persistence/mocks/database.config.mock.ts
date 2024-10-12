import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

export const getConfig = (): TypeOrmModuleOptions => {
    return {
        type: "sqlite",
        database: ":memory:",
        entities: ["src/common/classes/entities/**/*.entity.ts"],
        synchronize: true,
        dropSchema: true,
        logging: false,
        keepConnectionAlive: true
    };
};

export const getImports = (entities: EntityClassOrSchema[]) => {
    return [TypeOrmModule.forRoot(getConfig()), TypeOrmModule.forFeature(entities)];
};
