import { RequestMethod } from "@nestjs/common";
import { Paginated } from "nestjs-paginate";

export type APIResponse<T> = APIResponseData<T> | APIResponseError;

export type APIResponseData<T> = APIResponseOneData<T> | APIResponsePaginatedData<T>;

export interface APIResponseError extends APIResponseMeta {
    success: false;
    error: APIError;
}

interface APIResponseOneData<T> extends APIResponseSuccess {
    paginated: false;
    payload: T;
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
    requestMethod: keyof typeof RequestMethod,
    success: boolean;
}
