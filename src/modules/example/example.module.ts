import { Module } from "@nestjs/common";
import { UserModule } from './endpoints/user/user.module';

@Module({
    imports: [UserModule]
})
export class ExampleModule {}
