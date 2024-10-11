import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from "express";
import { catchError, Observable, tap } from "rxjs";
import { Composer } from "../../utils/composer";
import env from "../../../../env/env";

// Interceptor that logs the request and response data and outputs errors to the console in development mode
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly _dev = env().root.dev;
    private readonly _logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        const id: string = Date.now().toString();
        const endpoint: string = request.url;
        const signature: string = `${id} {${endpoint}, ${request.method}}`;

        this._logger.verbose(Composer.log("Request", signature));
        return next.handle().pipe(
            tap(() => {
                const timeElapsedMs: number = Date.now() - parseInt(id);
                this._logger.verbose(Composer.log("Response (OK)", `${signature} | timeElapsed:${timeElapsedMs}ms`));
            }),
            catchError((error) => {
                const timeElapsedMs: number = Date.now() - parseInt(id);
                if(this._dev) this._logger.error(error);
                this._logger.verbose(Composer.log("Response (Error)", `${signature} | timeElapsed:${timeElapsedMs}ms`));
                throw error;
            })
        );
    }
}
