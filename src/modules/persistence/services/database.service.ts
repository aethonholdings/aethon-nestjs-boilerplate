import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { paginate, PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { DataSource, DeleteResult, FindOneOptions, UpdateResult, ObjectLiteral, EntityTarget, FindOptions } from "typeorm";

@Injectable()
export class DatabaseService {
    constructor(private readonly dataSource: DataSource) {}

    findAll(entity: EntityTarget<ObjectLiteral>, options: FindOptions): Promise<ObjectLiteral[]> {
        const repository = this.dataSource.getRepository(entity);
        return repository.findBy(options);
    }

    findAllPaginated<T>(
        entity: EntityTarget<ObjectLiteral>,
        query: PaginateQuery,
        paginateConfig: PaginateConfig<T>
    ): Promise<Paginated<ObjectLiteral>> {
        const repository = this.dataSource.getRepository(entity);
        return paginate(query, repository, paginateConfig);
    }

    findOne(entity: EntityTarget<ObjectLiteral>, options: FindOneOptions): Promise<ObjectLiteral> {
        const repository = this.dataSource.getRepository(entity);
        return repository.findOneOrFail(options);
    }

    create(entity: EntityTarget<ObjectLiteral>, dto: any): Promise<ObjectLiteral> {
        const repository = this.dataSource.getRepository(entity);
        return repository.save(dto);
    }

    update(entity: EntityTarget<ObjectLiteral>, id: number, dto: any): Promise<null> {
        // check if the object submitted has an id that is inconsistent with the id in the URL
        const repository = this.dataSource.getRepository(entity);
        return repository.update(id, dto).then((result: UpdateResult) => {
            return this.checkIfFound(result);
        });
    }

    delete(entity: EntityTarget<ObjectLiteral>, id: number): Promise<null> {
        const repository = this.dataSource.getRepository(entity);
        return repository.delete(id).then((result: DeleteResult) => {
            return this.checkIfFound(result);
        });
    }

    private checkIfFound(result: DeleteResult | UpdateResult): null {
        if (result.affected === 0) {
            throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        }
        return null;
    }
}
