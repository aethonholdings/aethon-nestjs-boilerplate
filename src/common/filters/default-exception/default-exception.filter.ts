import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { Response, Request } from "express";
import { APIResponse } from "src/common/types/types";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

// filter handling unhandled errors, converting them to the desired HTTP status code
@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
    private readonly _logger = new Logger(DefaultExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const httpHost: HttpArgumentsHost = host.switchToHttp();
        const response: Response = httpHost.getResponse();
        const request: Request = httpHost.getRequest();
        if (!(exception instanceof HttpException)) {
            let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
            let message: string = "Internal Server Error";

            if (exception instanceof EntityNotFoundError) {
                status = HttpStatus.NOT_FOUND;
                message = "Not Found";
            }
            if (exception instanceof QueryFailedError) {
                status = HttpStatus.BAD_REQUEST;
                message = "Bad request";
            }
            exception = new HttpException(message, status);
        } else
            response.status(exception.getStatus()).json({
                success: false,
                path: request.url,
                requestMethod: request.method,
                error: {
                    status: exception.getStatus(),
                    message: exception.message
                }
            } as APIResponse<any>);
    }
}
