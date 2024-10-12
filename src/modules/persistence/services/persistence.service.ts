import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { EntityTarget, FindOneOptions, ObjectLiteral } from "typeorm";
import { DatabaseService } from "./database.service";

@Injectable()
export class PersistenceService {
    constructor(private readonly databaseService: DatabaseService) {}

    findAll<T>(
        entity: EntityTarget<ObjectLiteral>,
        query: PaginateQuery,
        paginateConfig: PaginateConfig<T>
    ): Promise<Paginated<ObjectLiteral>> {
        return this.databaseService.findAll(entity, query, paginateConfig);
    }

    findOne(entity: EntityTarget<ObjectLiteral>, options: FindOneOptions): Promise<ObjectLiteral> {
        return this.databaseService.findOne(entity, options);
    }

    create(entity: EntityTarget<ObjectLiteral>, dto: any): Promise<ObjectLiteral> {
        return this.databaseService.create(entity, dto);
    }

    update(entity: EntityTarget<ObjectLiteral>, id: number, dto: any): Promise<null> {
        // check if the object submitted has an id that is inconsistent with the id in the URL
        if (dto?.id && dto.id !== id) {
            delete dto.id;
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
        }
        return this.databaseService.update(entity, id, dto);
    }

    delete(entity: EntityTarget<ObjectLiteral>, id: number): Promise<null> {
        return this.databaseService.delete(entity, id);
    }
}
