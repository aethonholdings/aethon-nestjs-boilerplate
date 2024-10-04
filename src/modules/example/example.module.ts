import { Module } from "@nestjs/common";
import { HelloWorldModule } from "./endpoints/hello-world/hello-world.module";

@Module({
    imports: [HelloWorldModule]
})
export class ExampleModule {}
