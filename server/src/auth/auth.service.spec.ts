import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { NguoiDungService } from '../nguoi-dung/nguoi-dung.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let nguoiDungService: { findByEmail: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    nguoiDungService = { findByEmail: jest.fn() };
    jwtService = { sign: jest.fn().mockReturnValue('fake-jwt-token') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: NguoiDungService, useValue: nguoiDungService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('phải được định nghĩa', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('ném UnauthorizedException khi email không tồn tại', async () => {
      nguoiDungService.findByEmail.mockResolvedValue(null);

      await expect(
        service.validateUser('a@example.com', '123456'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('ném UnauthorizedException khi sai mật khẩu', async () => {
      nguoiDungService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'a@example.com',
        mat_khau: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser('a@example.com', 'sai-mat-khau'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('trả về user (không có mat_khau) khi đăng nhập đúng', async () => {
      nguoiDungService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'a@example.com',
        mat_khau: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('a@example.com', '123456');

      expect((result as any).mat_khau).toBeUndefined();
      expect(result.email).toBe('a@example.com');
    });
  });

  describe('login', () => {
    it('trả về access_token và thông tin user khi đăng nhập thành công', async () => {
      nguoiDungService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'a@example.com',
        mat_khau: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login('a@example.com', '123456');

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 1,
        email: 'a@example.com',
      });
      expect(result.access_token).toBe('fake-jwt-token');
    });
  });
});
