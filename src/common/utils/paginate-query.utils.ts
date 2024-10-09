import { PaginateQuery } from "nestjs-paginate";

const defaultPaginateQuery: Partial<PaginateQuery> = { page: 1, limit: 10 };

export function paginateQuery(query: PaginateQuery, path: string): PaginateQuery {
    return query ? query : (query = { ...defaultPaginateQuery, path: path });
}


