import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, of } from "rxjs";
import { APIResponse } from "../types/types";
import { Paginated } from "nestjs-paginate";

@Injectable()
export class APIDataResponseInterceptor implements NestInterceptor {
    private readonly _logger = new Logger(APIDataResponseInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<any>> {
        const request = context.switchToHttp().getRequest();
        const startTime = Date.now();
        const id: string = `id:${startTime.valueOf()}`;
        const url: string = `${request.protocol}://${request.get("Host")}${request.originalUrl}`;
        const endpoint: string = `${request.originalUrl}`;
        const query: string = `${JSON.stringify(request.query)}`;
        const body: string = `${JSON.stringify(request.body)}`;
        
        this._logger.verbose(`REQUEST ${id} > [${request.method}]${endpoint} | query: ${query} | body: ${body}`);
        return next.handle().pipe(
            map((data: any) => {
                const response: APIResponse<any> = {
                    success: true,
                    url: url,
                    requestMethod: request.method,
                    paginated: data instanceof Paginated,
                    elapsedTime: Date.now() - startTime,
                    payload: data
                } as APIResponse<any>;
                this._logger.verbose(`ERROR ${id} > ${JSON.stringify(response)}`);
                return response;
            }),
            catchError((exception) => {
                const status: string = exception instanceof HttpException ? exception.getStatus().toString() : "500";
                const message: string = exception?.message
                    ? JSON.stringify(exception.message)
                    : "Internal Server Error";
                const response: APIResponse<any> = {
                    success: false,
                    url: url,
                    requestMethod: request.method,
                    error: {
                        status: status,
                        message: message
                    }
                };
                this._logger.verbose(`ERROR ${id} > ${JSON.stringify(response)}`);
                return of(response);
            })
        );
    }
}
