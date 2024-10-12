import { Module } from "@nestjs/common";
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { PersistenceModule } from "src/modules/persistence/persistence.module";
import { DatabaseService } from "src/modules/persistence/services/database.service";

@Module({
    imports: [PersistenceModule],
    controllers: [ExampleController],
    providers: [ExampleService, DatabaseService]
})
export class ExampleModule {}
