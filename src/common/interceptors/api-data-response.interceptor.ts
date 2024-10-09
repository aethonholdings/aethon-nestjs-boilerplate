import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { APIResponse } from "../types/types";
import { Paginated } from "nestjs-paginate";

@Injectable()
export class APIDataResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<any>> {
    const request = context.switchToHttp().getRequest();
    const url:string = `${request.protocol}://${request.get('Host')}${request.originalUrl}`
    const startTime = Date.now();

    return next
      .handle()
      .pipe(
        map((data: any) => {
            return {
                success: true,
                url: url,
                requestMethod: request.method,
                paginated: data instanceof Paginated,
                elapsedTime: Date.now() - startTime,
                payload: data  
            }
        }),
      );
  }
}