import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { EntityNotFoundError, QueryFailedError, TypeORMError } from "typeorm";

// filter handling TypeORM errors, converting them to the desired HTTP status code
@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    private readonly _logger = new Logger(TypeOrmExceptionFilter.name);

    catch(exception: TypeORMError, host: ArgumentsHost) {
        let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string = "Internal Server Error";

        if (exception instanceof EntityNotFoundError) {
            status = HttpStatus.NOT_FOUND;
            message = "Resource Not Found";
        }
        if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        }
        throw new HttpException(message, status);
    }
}
