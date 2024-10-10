import { Request } from "express";
import { APIResponse } from "../types/types";
import { ArgumentsHost, HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Paginated } from "nestjs-paginate";

export namespace Composer {
    export function dataResponse<T>(
        host: ArgumentsHost,
        data: T,
    ): APIResponse<T> {
        const httpArguments: HttpArgumentsHost = host.switchToHttp();
        const request: Request = httpArguments.getRequest();
        const url: string = request.url;
        return {
            success: true,
            path: url,
            requestMethod: request.method,
            paginated: data instanceof Paginated,
            payload: data
        } as APIResponse<T>;
    }

    export function errorResponse<T>(httpArguments: HttpArgumentsHost, status?: number, message?: string): APIResponse<T> {
        const request: Request = httpArguments.getRequest();
        (status)? status : 500;
        (message)? message : 'Internal Server Error';
        return {
            success: false,
            path: request.url,
            requestMethod: request.method,
            error: {
                status: status,
                message: message
            }
        } as APIResponse<any>
    }

    export function log(event: string, message: string): string {
        message = message.replace(/\n/g, " ").replace(/\s+/g, " ");
        return `${event}: ${message}`;
    }
}
