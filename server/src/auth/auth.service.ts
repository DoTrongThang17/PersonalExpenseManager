import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly nguoiDungService: NguoiDungService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<NguoiDung, 'mat_khau'>> {
    const normalizedEmail = email?.trim().toLowerCase();
    const user = await this.nguoiDungService.findByEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    const isMatch = await bcrypt.compare(password, user.mat_khau);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- chỉ dùng để loại field khỏi response
    const { mat_khau, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
      user,
    };
  }
}
