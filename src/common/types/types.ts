import { Paginated } from "nestjs-paginate";

export type APIResponse<T> = APIResponseError | APIResponseData<T> | APIResponsePaginatedData<T>;

interface APIResponseError extends APIResponseMeta {
    success: false;
    error: APIError;
}

interface APIResponseData<T> extends APIResponseMeta {
    success: true;
    paginated: false;
    data?: T;
}

interface APIResponsePaginatedData<T> extends APIResponseMeta {
    success: true;
    paginated: true;
    data: Paginated<T>;
}

interface APIError extends APIResponseMeta {
    type: string;
    message: string;
}

interface APIResponseMeta {
    url: string;
    success: boolean;
}
