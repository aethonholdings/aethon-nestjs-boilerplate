import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";
import { EntityNotFoundError, TypeORMError } from "typeorm";
import { Composer } from "src/common/utils/composer";
import env from "env/env";

@Catch(TypeORMError)
export class TypeOrmExceptionFilter<T> implements ExceptionFilter {
    private readonly _logger = new Logger(TypeOrmExceptionFilter.name);
    private readonly _env = env();

    catch(exception: TypeORMError, host: ArgumentsHost) {
        let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string = "Internal Server Error";
        const httpArguments: HttpArgumentsHost = host.switchToHttp();
        const response: Response = httpArguments.getResponse();

        if(exception instanceof EntityNotFoundError) {
            status = HttpStatus.NOT_FOUND;
            message = "Resource Not Found";
        }
        response.status(status).json(Composer.errorResponse(httpArguments, status, message));
        this._logger.verbose(Composer.log("TypeORMError", exception.message.toString()));
    }
}
