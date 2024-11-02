import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";

export const exampleTestData: ExampleCreateDTO[] = [
    {
        firstName: "John",
        lastName: "Doe",
        isActive: true
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        isActive: false
    },
    {
        firstName: "John",
        lastName: "Smith",
        isActive: true
    }
];
