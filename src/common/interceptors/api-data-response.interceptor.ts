import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { APIResponse } from "../types/types";

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
            const payload: boolean = (data!==null);
            const paginated: boolean = false; // PLACEHOLDER
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            return {
                success: true,
                url: url,
                requestMethod: request.method,
                paginated: payload ? paginated : undefined,
                elapsedTime: elapsedTime,
                data: payload ? data : undefined  
            }
        }),
      );
  }
}