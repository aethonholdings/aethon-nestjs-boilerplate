import { Module } from "@nestjs/common";
import { ExampleModule } from "../example/example.module";
import { ConfigModule } from "@nestjs/config";
import environment from "../../../env/env";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [environment],
            isGlobal: true
        }),
        ExampleModule
    ]
})
export class RootModule {}
