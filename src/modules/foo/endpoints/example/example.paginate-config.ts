import { PaginateConfig } from "aethon-nestjs-paginate";

export const examplePaginateConfig: PaginateConfig = {
    limit: 100,
    limitMax: 1000,
    orderBy: [["id", "ASC"]]
};