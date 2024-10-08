import { Module } from "@nestjs/common";
import { HelloWorldModule } from "./endpoints/hello-world/hello-world.module";
import { UserModule } from './endpoints/user/user.module';

@Module({
    imports: [HelloWorldModule, UserModule]
})
export class ExampleModule {}
