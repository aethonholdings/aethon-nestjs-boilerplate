import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { APIResponse } from "../types/types";

@Injectable()
export class APIDataResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<any>> {
    const request = context.switchToHttp().getRequest();
    const url:string = `${request.protocol}://${request.get('Host')}${request.originalUrl}`
    return next
      .handle()
      .pipe(
        map((data: any) => {
            return {
                success: true,
                url: url,
                paginated: false,  // THIS NEEDS TO BE HANDLED
                data: data,
            }
        }),
      );
  }
}