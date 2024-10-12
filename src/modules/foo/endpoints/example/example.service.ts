import { Injectable } from "@nestjs/common";
import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { ExampleGetDTO } from "src/common/classes/dto/example/example.get.dto";
import { ExampleUpdateDTO } from "src/common/classes/dto/example/example.update.dto";
import { Example } from "src/common/classes/entities/example.entity";
import { Repository } from "typeorm";
import { DatabaseService } from "src/modules/persistence/services/database.service";

export const paginateConfig: PaginateConfig<Example> = {
    sortableColumns: ["id"],
    defaultSortBy: [["id", "ASC"]]
};

// services process the request data, intereact with the persistence layer, and transform the data to be returned into DTOs
@Injectable()
export class ExampleService {
    private readonly _exampleRepository: Repository<Example>;
    private readonly _paginateConfig: PaginateConfig<Example> = paginateConfig;

    constructor(private readonly databaseService: DatabaseService) {}

    async findAll(query: PaginateQuery): Promise<Paginated<ExampleGetDTO>> {
        return this.databaseService.findAll(Example, query, this._paginateConfig) as Promise<Paginated<ExampleGetDTO>>;
    }

    async findOne(id: number): Promise<ExampleGetDTO> {
        return this.databaseService.findOne(Example, { where: { id: id } }) as Promise<ExampleGetDTO>;
    }

    async create(createDTO: ExampleCreateDTO): Promise<ExampleGetDTO> {
        return this.databaseService.create(ExampleGetDTO, createDTO) as Promise<ExampleGetDTO>;
    }

    async update(id: number, updateDTO: ExampleUpdateDTO): Promise<null> {
        return this.databaseService.update(Example, id, updateDTO) as Promise<null>;
    }

    async delete(id: number): Promise<null> {
        return this.databaseService.delete(Example, id) as Promise<null>;
    }

    getPaginateConfig(): PaginateConfig<Example> {
        return this._paginateConfig;
    }
}
