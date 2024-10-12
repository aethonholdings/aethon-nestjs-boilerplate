import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ExampleInterface } from "src/common/interfaces/example.interface";

export class ExampleGetDTO implements ExampleInterface {
    @ApiProperty({
        name: "id",
        type: Number,
        required: true,
        description: "The id of the example class entity.",
        example: 1
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        name: "firstName",
        type: String,
        required: true,
        description: "A first name parameter.",
        example: "John"
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        name: "lastName",
        type: String,
        required: true,
        description: "A last name parameter.",
        example: "Doe"
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        name: "isActive",
        type: Boolean,
        required: true,
        description: "Whether the entity is active.",
        example: true
    })
    @IsBoolean()
    isActive: boolean;
}
