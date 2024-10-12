import { Module } from "@nestjs/common";
import { FooModule } from "../foo/foo.module";
import { ConfigModule } from "@nestjs/config";
import environment from "../../../env/env";
import { PersistenceModule } from "src/modules/persistence/persistence.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [environment],
            isGlobal: true
        }),
        PersistenceModule,
        FooModule
    ]
})
export class RootModule {}
