import { Module } from "@nestjs/common";
import { ExampleModule } from "../example/example.module";
import { ConfigModule } from "@nestjs/config";
import environment from "../../../env/env";
import { DatabaseModule } from "src/common/database/database.module";
import { APP_FILTER } from "@nestjs/core";
import { APIErrorResponseFilter } from "src/common/filters/api-error-response.filter";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [environment],
            isGlobal: true
        }),
        DatabaseModule,
        ExampleModule
    ]
})
export class RootModule {}
