import { Module } from "@nestjs/common";
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { DatabaseModule } from "src/modules/database/database.module";
import { DatabaseService } from "src/modules/database/services/database.service";

@Module({
    imports: [DatabaseModule],
    controllers: [ExampleController],
    providers: [ExampleService, DatabaseService]
})
export class ExampleModule {}
