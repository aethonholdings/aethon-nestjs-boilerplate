import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ExampleService, paginateConfig } from "./example.service";
import { ExampleGetDTO } from "src/common/classes/dto/example/example.get.dto";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { ExampleUpdateDTO } from "src/common/classes/dto/example/example.update.dto";
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

const path = "example";

@Controller(path)
@ApiTags("example")
export class ExampleController {
    constructor(private exampleService: ExampleService) {}

    @Get()
    @ApiPaginationQuery(paginateConfig)
    @ApiOkPaginatedResponse(ExampleGetDTO, paginateConfig)
    @ApiOkResponse({ description: "Returns a paginated list of example class entities." })
    findAll(@Paginate() query: PaginateQuery): Promise<Paginated<ExampleGetDTO>> {
        return this.exampleService.findAll(query);
    }

    @Get(":id")
    @ApiParam({
        name: "id",
        type: Number,
        required: true,
        description: "The id of the example class entity to be fetched."
    })
    @ApiOkResponse({ type: ExampleGetDTO, description: "Returns a single example class entity base on their id." })
    findOne(@Param("id") id: number): Promise<ExampleGetDTO> {
        return this.exampleService.findOne(id);
    }

    @Post()
    @ApiParam({
        name: "createDTO",
        type: ExampleCreateDTO,
        required: true,
        description: "The data to create a new example class entity."
    })
    @ApiOkResponse({ type: ExampleGetDTO, description: "Creates and returns a new example class entity." })
    create(@Body() createDTO: ExampleCreateDTO): Promise<ExampleGetDTO> {
        return this.exampleService.create(createDTO);
    }

    @Put(":id")
    @ApiParam({
        name: "id",
        type: "number",
        required: true,
        description: "The id of the example class entity to be updated."
    })
    @ApiBody({
        type: ExampleUpdateDTO,
        required: true,
        description: "The data to update an existing example class entity."
    })
    @ApiOkResponse({ type: null, description: "Updates an existing example class entity." })
    update(@Param("id") id: number, @Body() updateDTO: ExampleUpdateDTO): Promise<null> {
        return this.exampleService.update(id, updateDTO);
    }

    @Delete(":id")
    @ApiParam({
        name: "id",
        type: "number",
        required: true,
        description: "The id of the example class entity to be deleted."
    })
    @ApiOkResponse({ type: null, description: "Deletes an existing example class entity." })
    delete(@Param("id") id: number): Promise<null> {
        return this.exampleService.delete(id);
    }
}
