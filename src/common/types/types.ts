import { RequestMethod } from "@nestjs/common";
import { Paginated } from "nestjs-paginate";

export type APIResponse<T> = APIResponseError | APIResponseData<T> | APIResponsePaginatedData<T>;

interface APIResponseError extends APIResponseMeta {
    success: false;
    error: APIError;
}

interface APIResponseData<T> extends APIResponseSuccess {
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
