import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { catchError, Observable, tap } from "rxjs";
import * as composer from "../../utils/composer";
import env from "../../../../env/env";

// Interceptor that logs the request and response data and outputs errors to the console in development mode
// correction can be made to how the time elapsed is calculated, it is inefficient now with the type conversions
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly _dev = env().root.dev;
    private readonly _logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        const id: string = Date.now().toString();
        const endpoint: string = request.url;
        const signature: string = `${id} {${endpoint}, ${request.method}}`;

        this._logger.verbose(composer.log("Request", signature));
        return next.handle().pipe(
            tap(() => {
                const timeElapsedMs: number = Date.now() - parseInt(id);
                this._logger.verbose(composer.log("Response (OK)", `${signature} | timeElapsed:${timeElapsedMs}ms`));
            }),
            catchError((error) => {
                const timeElapsedMs: number = Date.now() - parseInt(id);
                if (this._dev) this._logger.error(composer.log("Error", error.message));
                this._logger.verbose(composer.log("Response (Error)", `${signature} | timeElapsed:${timeElapsedMs}ms`));
                throw error;
            })
        );
    }
}
