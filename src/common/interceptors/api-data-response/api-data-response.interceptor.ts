import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { APIResponse } from "../../types/types";
import { Composer } from "src/common/utils/composer";

@Injectable()
export class APIDataResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return Composer.dataResponse(context, data);
            })
        );
    }
}
