import { ApiProperty } from "@nestjs/swagger";
import { ExampleInterface } from "src/common/interfaces/example.interface";

export class ExampleGetDTO implements ExampleInterface {
    @ApiProperty({
        name: "id",
        type: Number,
        required: true,
        description: "The id of the example class entity.",
        example: 1
    })
    id: number;

    @ApiProperty({
        name: "firstName",
        type: String,
        required: true,
        description: "A first name parameter.",
        example: "John"
    })
    firstName: string;

    @ApiProperty({
        name: "lastName",
        type: String,
        required: true,
        description: "A last name parameter.",
        example: "Doe"
    })
    lastName: string;

    @ApiProperty({
        name: "isActive",
        type: Boolean,
        required: true,
        description: "Whether the entity is active.",
        example: true
    })
    isActive: boolean;
}
