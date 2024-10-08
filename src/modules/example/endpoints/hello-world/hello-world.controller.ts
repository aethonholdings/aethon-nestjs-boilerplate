import { Controller, Get } from "@nestjs/common";
import { HelloWorldService } from "./hello-world.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { HelloWorldDTOGet } from "../../../../common/dto/hello-world/hello-world.get.dto";

@Controller()
@ApiTags("Hello world")
export class HelloWorldController {
    constructor(private readonly exampleService: HelloWorldService) {}

    @Get()
    @ApiOkResponse({
        type: HelloWorldDTOGet,
        description: "The hello world response"
    })
    getHello(): HelloWorldDTOGet {
        return this.exampleService.getHello();
    }
}
