import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NguoiDungService } from './nguoi-dung.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn(),
}));

const mockNguoiDungRepo = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn((dto) => dto),
  save: jest.fn((entity) => Promise.resolve({ id: 1, ...entity })),
  remove: jest.fn((entity) => Promise.resolve(entity)),
});

describe('NguoiDungService', () => {
  let service: NguoiDungService;
  let repo: ReturnType<typeof mockNguoiDungRepo>;

  beforeEach(async () => {
    repo = mockNguoiDungRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NguoiDungService,
        { provide: 'NGUOI_DUNG_REPOSITORY', useValue: repo },
      ],
    }).compile();

    service = module.get<NguoiDungService>(NguoiDungService);
  });

  afterEach(() => jest.clearAllMocks());

  it('phải được định nghĩa', () => {
    expect(service).toBeDefined();
  });

  describe('create (đăng ký)', () => {
    const dto = {
      ho_ten: 'Nguyễn Văn A',
      email: 'A@Example.com',
      mat_khau: '123456',
      so_dien_thoai: '0900000000',
    };

    it('đăng ký thành công, mật khẩu được băm và không trả về trong response', async () => {
      repo.findOne.mockResolvedValue(null);

      const result = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(repo.save).toHaveBeenCalled();
      // email phải được chuẩn hoá về chữ thường
      expect(result.data.email).toBe('a@example.com');
      expect((result.data as any).mat_khau).toBeUndefined();
    });

    it('ném BadRequestException khi email đã tồn tại', async () => {
      repo.findOne.mockResolvedValue({ id: 1, email: 'a@example.com' });

      await expect(service.create(dto as any)).rejects.toThrow(
        BadRequestException,
      );
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('ném ForbiddenException khi xem hồ sơ người khác', async () => {
      await expect(service.findOne(2, 1)).rejects.toThrow(ForbiddenException);
      expect(repo.findOne).not.toHaveBeenCalled();
    });

    it('ném NotFoundException khi không tìm thấy chính mình (đã bị xoá)', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('trả về hồ sơ, không có field mat_khau', async () => {
      repo.findOne.mockResolvedValue({
        id: 1,
        email: 'a@example.com',
        mat_khau: 'hash',
      });

      const result = await service.findOne(1, 1);

      expect((result as any).mat_khau).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('ném ForbiddenException khi cố xoá tài khoản người khác', async () => {
      await expect(service.remove(2, 1)).rejects.toThrow(ForbiddenException);
      expect(repo.remove).not.toHaveBeenCalled();
    });

    it('xoá thành công tài khoản của chính mình', async () => {
      repo.findOne.mockResolvedValue({ id: 1, email: 'a@example.com' });

      const result = await service.remove(1, 1);

      expect(repo.remove).toHaveBeenCalled();
      expect(result.message).toBe('Xóa người dùng thành công');
    });
  });
});
