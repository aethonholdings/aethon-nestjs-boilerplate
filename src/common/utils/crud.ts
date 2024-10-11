import { HttpException, HttpStatus } from "@nestjs/common";
import { paginate, PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from "typeorm";
import env from "env/env";

const dev = env().root.dev;

export function findAll<T>(
    query: PaginateQuery,
    repository: Repository<T>,
    paginateConfig: PaginateConfig<T>
): Promise<Paginated<T>> {
    return paginate(query, repository, paginateConfig).catch((error) => {
        throw errorFactory(HttpStatus.INTERNAL_SERVER_ERROR, error);
    });
}

export function findOne<T>(repository: Repository<T>, options: FindOneOptions): Promise<T> {
    return repository.findOneOrFail(options).catch((error) => {
        throw errorFactory(HttpStatus.NOT_FOUND, error);
    });
}

export function create<T>(repository: Repository<T>, dto: T): Promise<any> {
    return repository.save(dto).catch((error) => {
        throw errorFactory(HttpStatus.INTERNAL_SERVER_ERROR, error);
    });
}

export function update<T>(id: number, repository: Repository<T>, dto: any): Promise<null> {
    // check if the object submitted has an id that is inconsistent with the id in the URL
    if (dto?.id !== id) {
        throw errorFactory(HttpStatus.BAD_REQUEST);
    }
    delete dto?.id;
    return repository
        .update(id, dto)
        .then((result: UpdateResult) => {
            return checkIfFound(result);
        })
        .catch((error) => {
            throw errorFactory(HttpStatus.BAD_REQUEST, error);
        });
}

export function remove<T>(id: number, repository: Repository<T>): Promise<null> {
    return repository.delete(id).then((result: DeleteResult) => {
        return checkIfFound(result);
    });
}

function checkIfFound(result: DeleteResult | UpdateResult): null {
    if (result.affected === 0) {
        throw errorFactory(HttpStatus.NOT_FOUND);
    }
    return null;
}

function errorFactory(
    status: HttpStatus.BAD_REQUEST | HttpStatus.NOT_FOUND | HttpStatus.INTERNAL_SERVER_ERROR,
    sourceError?: Error
): Error {
    if (dev && sourceError) {
        return sourceError;
    }
    switch (status) {
        case HttpStatus.BAD_REQUEST:
            return new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        case HttpStatus.NOT_FOUND:
            return new HttpException("Not found", HttpStatus.NOT_FOUND);
        default:
            return new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
