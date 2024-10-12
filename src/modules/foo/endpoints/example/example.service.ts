import { Injectable } from "@nestjs/common";
import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { ExampleCreateDTO } from "src/common/classes/dto/example/example.create.dto";
import { ExampleGetDTO } from "src/common/classes/dto/example/example.get.dto";
import { ExampleUpdateDTO } from "src/common/classes/dto/example/example.update.dto";
import { Example } from "src/common/classes/entities/example.entity";
import { Repository } from "typeorm";
import { PersistenceService } from "src/modules/persistence/services/persistence.service";

export const paginateConfig: PaginateConfig<Example> = {
    sortableColumns: ["id"],
    defaultSortBy: [["id", "ASC"]]
};

// services process the request data according to business logic,
// intereact with the persistence layer, and return data as standardised DTOs
@Injectable()
export class ExampleService {
    private readonly _exampleRepository: Repository<Example>;
    private readonly _paginateConfig: PaginateConfig<Example> = paginateConfig;

    constructor(private readonly persistenceService: PersistenceService) {}

    async findAll(query: PaginateQuery): Promise<Paginated<ExampleGetDTO>> {
        return this.persistenceService.findAllPaginated(Example, query, this._paginateConfig) as Promise<
            Paginated<ExampleGetDTO>
        >;
    }

    async findOne(id: number): Promise<ExampleGetDTO> {
        return this.persistenceService.findOne(Example, { where: { id: id } }) as Promise<ExampleGetDTO>;
    }

    async create(createDTO: ExampleCreateDTO): Promise<ExampleGetDTO> {
        return this.persistenceService.create(ExampleGetDTO, createDTO) as Promise<ExampleGetDTO>;
    }

    async update(id: number, updateDTO: ExampleUpdateDTO): Promise<null> {
        return this.persistenceService.update(Example, id, updateDTO) as Promise<null>;
    }

    async delete(id: number): Promise<null> {
        return this.persistenceService.delete(Example, id) as Promise<null>;
    }
}
