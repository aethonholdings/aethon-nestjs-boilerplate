import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, ExecutionContext } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";
import { Composer } from "src/common/utils/composer";

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
    private readonly _logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const httpArguments: HttpArgumentsHost = host.switchToHttp();
        const response: Response = httpArguments.getResponse();
        response
            .status(exception.getStatus())
            .json(Composer.errorResponse(httpArguments, exception.getStatus(), exception.message.toString()));
        this._logger.verbose(Composer.log("HttpException", exception.message.toString()));
    }
}
