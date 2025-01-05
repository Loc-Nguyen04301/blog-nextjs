import { NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
export type Response<T> = {
    statusCode: number;
    message: string;
    data: T;
    path: string;
    timestamp: string;
};
export declare class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private readonly customMessage;
    constructor(customMessage?: string);
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
    errorHandler(exception: HttpException, context: ExecutionContext): void;
    responseHandler(res: any, context: ExecutionContext, customMessage: string): {
        statusCode: any;
        message: string;
        data: any;
        path: any;
        timestamp: string;
    };
}
