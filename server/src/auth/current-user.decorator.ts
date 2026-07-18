import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface CurrentUserPayload {
  userId: number;
  email: string;
}

/**
 * Lấy thông tin người dùng đang đăng nhập (giải mã từ JWT bởi JwtStrategy).
 * Chỉ dùng được trên route đã có @UseGuards(JwtAuthGuard).
 *
 * Ví dụ:
 *   @UseGuards(JwtAuthGuard)
 *   @Get()
 *   findAll(@CurrentUser() user: CurrentUserPayload) {
 *     return this.service.findAll(user.userId);
 *   }
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: CurrentUserPayload }>();
    return request.user;
  },
);
