import { Injectable } from "@nestjs/common";
import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { ExampleCreateDTO } from "src/common/dto/example/example.create.dto";
import { ExampleGetDTO } from "src/common/dto/example/example.get.dto";
import { ExampleUpdateDTO } from "src/common/dto/example/example.update.dto";
import { Example } from "src/common/database/entities/example.entity";
import { DataSource, Repository } from "typeorm";
import { crud } from "../../../../common/utils/crud";

export const paginateConfig: PaginateConfig<Example> = {
    sortableColumns: ["id"],
    defaultSortBy: [["id", "ASC"]]
};

@Injectable()
export class ExampleService {
    private readonly _exampleRepository: Repository<Example>;
    private readonly _paginateConfig: PaginateConfig<Example> = paginateConfig;

    constructor(private readonly dataSource: DataSource) {
        this._exampleRepository = this.dataSource.getRepository(Example);
    }

    getPaginateConfig(): PaginateConfig<Example> { return this._paginateConfig; }

    async findAll(query: PaginateQuery): Promise<Paginated<ExampleGetDTO>> {
        return crud.findAll(query, this._exampleRepository, this._paginateConfig);
    }

    async findOne(id: number): Promise<ExampleGetDTO> {
        return crud.findOne(this._exampleRepository, { where: { id: id } });
    }

    async create(userCreateDTO: ExampleCreateDTO): Promise<ExampleGetDTO> {
        return crud.create(this._exampleRepository, userCreateDTO);
    }

    async update(id: number, userUpdateDTO: ExampleUpdateDTO): Promise<null> {
        return crud.update(id, this._exampleRepository, userUpdateDTO);
    }

    async delete(id: number): Promise<null> {
        return crud.remove(id, this._exampleRepository);
    }
}
