import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './login.dto';
import { CurrentUser, type CurrentUserPayload } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.mat_khau);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@CurrentUser() user: CurrentUserPayload) {
    return {
      message: 'Bạn đã đăng nhập thành công',
      user,
    };
  }
}
