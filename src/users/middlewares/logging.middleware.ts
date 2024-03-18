import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    logger = new Logger('response');
    constructor() { }
    use(req: Request, res: Response, next: () => void) {
        const { method, originalUrl: url } = req;
        const reqTime = new Date().getTime();

        res.on('finish', () => {
            const { statusCode } = res;
            const resTime = new Date().getTime();
            if (statusCode === 200 || statusCode === 201) {
                this.logger.log(`${method} ${url} ${statusCode} ${resTime - reqTime} ms`);
            }
        })
        next();
    }
}