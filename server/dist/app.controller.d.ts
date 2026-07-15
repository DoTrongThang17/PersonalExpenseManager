import type { Request, Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getTopics(): string;
    setCookie(res: Response): void;
    setSession(req: Request, res: Response): void;
    getSession(req: Request): {
        username: any;
    };
}
