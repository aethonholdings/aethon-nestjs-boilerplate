import { Module } from "@nestjs/common";
import { ExampleModule } from "./endpoints/example/example.module";

@Module({
    imports: [ExampleModule]
})
export class FooModule {}
