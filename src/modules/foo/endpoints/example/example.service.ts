import { Injectable } from "@nestjs/common";
import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { ExampleCreateDTO } from "src/common/dto/example/example.create.dto";
import { ExampleGetDTO } from "src/common/dto/example/example.get.dto";
import { ExampleUpdateDTO } from "src/common/dto/example/example.update.dto";
import { Example } from "src/common/entities/example.entity";
import { DataSource, Repository } from "typeorm";
import { DatabaseService } from "src/modules/database/services/database/database.service";

export const paginateConfig: PaginateConfig<Example> = {
    sortableColumns: ["id"],
    defaultSortBy: [["id", "ASC"]]
};

@Injectable()
export class ExampleService {
    private readonly _exampleRepository: Repository<Example>;
    private readonly _paginateConfig: PaginateConfig<Example> = paginateConfig;

    constructor(
        private readonly dataSource: DataSource,
        private readonly databaseService: DatabaseService
    ) {
        this._exampleRepository = this.dataSource.getRepository(Example);
    }

    async findAll(query: PaginateQuery): Promise<Paginated<ExampleGetDTO>> {
        return this.databaseService.findAll(query, this._exampleRepository, this._paginateConfig);
    }

    async findOne(id: number): Promise<ExampleGetDTO> {
        return this.databaseService.findOne(this._exampleRepository, { where: { id: id } });
    }

    async create(createDTO: ExampleCreateDTO): Promise<ExampleGetDTO> {
        return this.databaseService.create(this._exampleRepository, createDTO);
    }

    async update(id: number, updateDTO: ExampleUpdateDTO): Promise<null> {
        return this.databaseService.update(id, this._exampleRepository, updateDTO);
    }

    async delete(id: number): Promise<null> {
        return this.databaseService.remove(id, this._exampleRepository);
    }

    getPaginateConfig(): PaginateConfig<Example> {
        return this._paginateConfig;
    }
}
