import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { AppService } from './app.service';

// Khai báo kiểu cho dữ liệu lưu trong session (thay vì ép kiểu `any`)
declare module 'express-session' {
  interface SessionData {
    username?: string;
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // =========================
  // Cookie
  // =========================
  @Get('cookie')
  setCookie(@Res() res: Response): void {
    res.cookie('username', 'thang', {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.send('Cookie created');
  }

  // =========================
  // Session
  // =========================
  @Get('session')
  setSession(@Req() req: Request, @Res() res: Response): void {
    req.session.username = 'thang';

    res.send('Session saved');
  }

  @Get('session/get')
  getSession(@Req() req: Request) {
    return {
      username: req.session.username ?? null,
    };
  }
}
