import { NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export type Response<T> = {
    statusCode: number;
    message: string;
    data: T;
    path: string;
    timestamp: string;
};
export declare class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
    errorHandler(exception: HttpException, context: ExecutionContext): void;
    responseHandler(res: any, context: ExecutionContext): {
        statusCode: any;
        message: string;
        data: any;
        path: any;
        timestamp: string;
    };
}
