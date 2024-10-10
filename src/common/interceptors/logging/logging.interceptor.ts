import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable, tap } from "rxjs";
import { Composer } from "../../utils/composer";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
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
                this._logger.verbose(Composer.log("Response", `${signature} | timeElapsed:${timeElapsedMs}ms`));
            })
        );
    }
}
