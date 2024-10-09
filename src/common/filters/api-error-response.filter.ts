import { ArgumentsHost, Catch, ExceptionFilter, HttpException, RequestMethod } from "@nestjs/common";
import { Request, Response } from "express";
import { APIResponse } from "../types/types";
import * as request from 'supertest';

@Catch()
export class APIErrorResponseFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request: Request = context.getRequest<Request>();
        const url: string = `${request.protocol}://${request.get("Host")}${request.originalUrl}`;
        const status: string = exception instanceof HttpException ? exception.getStatus().toString() : "500";
        const message: string = exception?.message ? JSON.stringify(exception.message) : "Internal Server Error";
        console.log(RequestMethod[request.method as keyof typeof RequestMethod]);

        context.getResponse<Response>().json({
            success: false,
            url: url,
            requestMethod: request.method,
            error: {
                status: status,
                message: message
            }
        } as APIResponse<any>);
    }
}
