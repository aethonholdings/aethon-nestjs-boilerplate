import { Module } from "@nestjs/common";
import { ExampleModule } from "../example/example.module";
import { ConfigModule } from "@nestjs/config";
import environment from "../../../env/env";
import { DatabaseModule } from "src/common/database/database.module";

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
