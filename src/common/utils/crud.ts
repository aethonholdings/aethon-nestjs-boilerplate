import { HttpException, HttpStatus } from "@nestjs/common";
import { paginate, PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from "typeorm";

export namespace crud {
    export function findAll<T>(
        query: PaginateQuery,
        repository: Repository<T>,
        paginateConfig: PaginateConfig<T>
    ): Promise<Paginated<T>> {
        return paginate(query, repository, paginateConfig).catch(() => {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    export function findOne<T>(repository: Repository<T>, options: FindOneOptions): Promise<T> {
        return repository.findOneOrFail(options).catch(() => {
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        });
    }

    export function create<T>(repository: Repository<T>, dto: T): Promise<any> {
        return repository.save(dto).catch(() => {
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        });
    }

    export function update<T>(id: number, repository: Repository<T>, dto: any): Promise<null> {
        return repository
            .update(id, dto)
            .then((result: UpdateResult) => {
                return _checkIfFound(result);
            })
            .catch(() => {
                throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
            });
    }

    export function del<T>(id: number, repository: Repository<T>): Promise<null> {
        return repository.delete(id).then((result: DeleteResult) => {
            return _checkIfFound(result);
        });
    }

    function _checkIfFound(result: DeleteResult | UpdateResult): null {
        if (!(result.affected > 0)) {
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        }
        return null;
    }
}
