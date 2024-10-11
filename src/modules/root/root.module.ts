import { Module } from "@nestjs/common";
import { FooModule } from "../foo/foo.module";
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
        FooModule
    ]
})
export class RootModule {}
