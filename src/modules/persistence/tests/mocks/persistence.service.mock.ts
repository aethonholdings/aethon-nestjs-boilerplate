import { PaginateConfig, Paginated, PaginateQuery } from "nestjs-paginate";
import { EntityTarget, FindOneOptions, FindOptions, ObjectLiteral } from "typeorm";
import { Example } from "src/common/classes/entities/example.entity";

export class MockPersistenceService<HasId> {
    private _data: HasId[] = [];

    constructor(data?: HasId[]) {
        this._data = data ? data : [];
    }

    setData(data: HasId[]): void {
        this._data = data;
    }

    clearData(): void {
        this._data = [];
    }

    getData(): HasId[] {
        return this._data;
    }

    findAll = jest.fn(async function (
        entity: EntityTarget<ObjectLiteral>,
        options: FindOptions
    ): Promise<ObjectLiteral[]> {
        if (entity && options) {
            // should be applying the filter options here
            return this._data;
        } else {
            throw new Error("Missing parameters for findAll in Persistence layer");
        }
    });
    findAllPaginated = jest.fn(async function <HasId>(
        entity: EntityTarget<ObjectLiteral>,
        query: PaginateQuery,
        paginateConfig: PaginateConfig<HasId>
    ): Promise<Paginated<ObjectLiteral>> {
        if (entity && query && paginateConfig) {
            const mockPagination = new Paginated<Example>();
            mockPagination.data = this._data;
            return mockPagination;
        } else {
            throw new Error("Missing parameters for findAll in Persistence layer");
        }
    });
    findOne = jest.fn(async function (
        entity: EntityTarget<ObjectLiteral>,
        options: FindOneOptions
    ): Promise<ObjectLiteral> {
        if (entity && options) {
            let id: number;
            if (options.where["id"]) {
                id = options.where["id"];
            } else {
                throw new Error("No ID provided for findOne in Persistence layer");
            }
            if (id > this._data.length || id < 1) {
                throw new Error("ID out of range for findOne in Persistence layer");
            }
            const entityInstance = this._data.find((item) => item.id === id);
            if (!entityInstance) {
                throw new Error("ID not found for findOne in Persistence layer");
            }
            return entityInstance;
        } else {
            throw new Error("Missing parameters for findOne in Persistence layer");
        }
    });
    create = jest.fn(async function (entity: EntityTarget<ObjectLiteral>, dto: any): Promise<ObjectLiteral> {
        if (entity && dto) {
            let newId = this._data.length ? this._data.sort((a, b) => b.id - a.id)[this._data.length - 1].id + 1 : 1;
            const newEntity = { id: newId, ...dto };
            this._data.push(newEntity);
            return newEntity;
        } else {
            throw new Error("Missing parameters for create in Persistence layer");
        }
    });
    update = jest.fn(async function (entity: EntityTarget<ObjectLiteral>, id: number, dto: any): Promise<null> {
        if (entity && id && dto) {
            let index = this._data.findIndex((item) => item.id === id);
            if(index===undefined) throw new Error("ID not found for update in Persistence layer");
            this._data[index] = { id: id, ...dto };
            return null;
        } else {
            throw new Error("Missing parameters for update in Persistence layer");
        }
    });
    delete = jest.fn(async function (entity: EntityTarget<ObjectLiteral>, id: number): Promise<null> {
        if (entity && id) {
            let index = this._data.findIndex((item) => item.id === id);
            if(index===undefined) throw new Error("ID not found for delete in Persistence layer");
            this._data = this._data.filter((item) => item.id !== id);
            return null;
        } else {
            throw new Error("Missing parameters for delete in Persistence layer");
        }
    });
}
