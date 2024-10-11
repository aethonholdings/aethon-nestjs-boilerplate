import { Module } from "@nestjs/common";
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { DatabaseModule } from "src/common/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [ExampleController],
    providers: [ExampleService]
})
export class ExampleModule {}
