import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { APIResponse } from "../../types/types";
import { Paginated } from "nestjs-paginate";
import { Request } from "express";

// Interceptor that wraps the response data in a standard APIResponse object
@Injectable()
export class APIResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<any>> {
        const request: Request = context.switchToHttp().getRequest();
        return next.handle().pipe(
            map((data: any) => {
                return {
                    success: true,
                    path: request.url,
                    requestMethod: request.method,
                    paginated: data instanceof Paginated,
                    payload: data
                } as APIResponse<any>;
            })
        );
    }
}
