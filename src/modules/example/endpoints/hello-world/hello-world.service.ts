import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HelloWorldDTOGet } from "../../../../common/dto/hello-world/hello-world.get.dto";

@Injectable()
export class HelloWorldService {
    constructor(private configService: ConfigService) {}

    getHello(): HelloWorldDTOGet {
        const hello = {
            apiVersion: this.configService.get<string>("api.version"),
            dev: this.configService.get<boolean>("dev")
        }
        return hello;
    }
}
