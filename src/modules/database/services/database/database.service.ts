import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { paginate, PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from "typeorm";

@Injectable()
export class DatabaseService {
    constructor() {}

    findAll<T>(
        query: PaginateQuery,
        repository: Repository<T>,
        paginateConfig: PaginateConfig<T>
    ): Promise<Paginated<T>> {
        return paginate(query, repository, paginateConfig);
    }

    findOne<T>(repository: Repository<T>, options: FindOneOptions): Promise<T> {
        return repository.findOneOrFail(options).catch((error) => {
            throw error;
        });
    }

    create<T>(repository: Repository<T>, dto: T): Promise<any> {
        return repository.save(dto);
    }

    update<T>(id: number, repository: Repository<T>, dto: any): Promise<null> {
        // check if the object submitted has an id that is inconsistent with the id in the URL
        if (dto?.id && dto.id !== id) {
            delete dto.id;
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        }
        return repository.update(id, dto).then((result: UpdateResult) => {
            return this.checkIfFound(result);
        });
    }

    remove<T>(id: number, repository: Repository<T>): Promise<null> {
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
