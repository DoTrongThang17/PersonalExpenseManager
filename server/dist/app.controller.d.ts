import type { Request, Response } from 'express';
import { AppService } from './app.service';
declare module 'express-session' {
    interface SessionData {
        username?: string;
    }
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    home(res: Response): void;
    setCookie(res: Response): void;
    setSession(req: Request, res: Response): void;
    getSession(req: Request): {
        username: string | null;
    };
}
