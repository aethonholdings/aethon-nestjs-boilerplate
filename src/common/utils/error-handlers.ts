import { HttpException, HttpStatus } from "@nestjs/common";
import { DeleteResult } from "typeorm";

export namespace ErrorHandlers {
    export function checkDelete(deleteResult: Promise<DeleteResult>): Promise<Boolean> {
        return deleteResult.then((result: DeleteResult) => {
            if (!(result.affected > 0)) {
                throw new HttpException("Resource Not Found", HttpStatus.NOT_FOUND);
            }
            return true;
        });
    }
}
