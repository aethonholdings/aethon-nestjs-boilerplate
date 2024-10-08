import { ApiProperty } from "@nestjs/swagger";

export class HelloWorldDTOGet {
     @ApiProperty({
        name: "apiVersion",
        type: String,
        description: "The API version",
        example: "0.1"
    })
    apiVersion: string;

    @ApiProperty({
        name: "dev",
        type: Boolean,
        description: "Whether the API running in dev mode",
        example: true
    })
    dev: Boolean;
}