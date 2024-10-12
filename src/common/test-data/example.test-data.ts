import { PaginateConfig } from "nestjs-paginate";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { Example } from "src/common/classes/entities/example.entity";

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

export const paginateConfig: PaginateConfig<Example> = {
    sortableColumns: ["id"],
    defaultSortBy: [["id", "ASC"]]
};
