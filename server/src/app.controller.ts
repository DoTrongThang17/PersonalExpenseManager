import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('topics')
  getTopics(): string {
    return 'this is testing';
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
    (req.session as any).username = 'thang';

    res.send('Session saved');
  }

  @Get('session/get')
  getSession(@Req() req: Request) {
    return {
      username: (req.session as any).username ?? null,
    };
  }
}