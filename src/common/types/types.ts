import { RequestMethod } from "@nestjs/common";
import { Paginated } from "nestjs-paginate";

export type Cacheable<T> = { key: string; cached: boolean; start: number; end?: number; ttl: number; data: T };
export type CacheOptions = { cached?: boolean; cache?: boolean, ttl?: number };

export type APIResponse<T> = APIResponseData<T> | APIResponseError;

export type APIResponseData<T> = APIResponseOneData<T> | APIResponsePaginatedData<T>;

export interface APIResponseError extends APIResponseMeta {
    success: false;
    error: APIError;
}

interface APIResponseOneData<T> extends APIResponseSuccess {
    paginated: false;
    payload: T | T[];
}

interface APIResponsePaginatedData<T> extends APIResponseSuccess {
    paginated: true;
    payload: Paginated<T>;
}

interface APIResponseSuccess extends APIResponseMeta {
    success: true;
}

interface APIError {
    status: number;
    message: string;
}

interface APIResponseMeta {
    path: string;
    requestMethod: keyof typeof RequestMethod;
    success: boolean;
}
