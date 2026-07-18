import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DanhMucService } from './danh-muc.service';
import { LoaiDanhMuc } from './danh-muc.entity';

// Mock repository TypeORM - không cần kết nối DB thật để test business logic
const mockDanhMucRepo = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn((dto) => dto),
  save: jest.fn((entity) => Promise.resolve({ id: 1, ...entity })),
  remove: jest.fn((entity) => Promise.resolve(entity)),
});

describe('DanhMucService', () => {
  let service: DanhMucService;
  let repo: ReturnType<typeof mockDanhMucRepo>;

  beforeEach(async () => {
    repo = mockDanhMucRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DanhMucService,
        { provide: 'DANH_MUC_REPOSITORY', useValue: repo },
      ],
    }).compile();

    service = module.get<DanhMucService>(DanhMucService);
  });

  afterEach(() => jest.clearAllMocks());

  it('phải được định nghĩa', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = { tenDanhMuc: 'Ăn uống', loai: LoaiDanhMuc.CHI };

    it('tạo danh mục mới thành công khi chưa trùng', async () => {
      repo.findOne.mockResolvedValue(null);

      const result = await service.create(1, dto);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { nguoiDungId: 1, tenDanhMuc: dto.tenDanhMuc, loai: dto.loai },
      });
      expect(repo.save).toHaveBeenCalled();
      expect(result).toMatchObject({ tenDanhMuc: 'Ăn uống', nguoiDungId: 1 });
    });

    it('ném BadRequestException khi danh mục trùng tên + loại', async () => {
      repo.findOne.mockResolvedValue({ id: 5, tenDanhMuc: 'Ăn uống' });

      await expect(service.create(1, dto as any)).rejects.toThrow(
        BadRequestException,
      );
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('trả về danh mục của user + danh mục dùng chung (nguoiDungId null)', async () => {
      repo.find.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const result = await service.findAll(1);

      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.any(Array),
        }),
      );
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('trả về danh mục khi tìm thấy', async () => {
      repo.findOne.mockResolvedValue({ id: 1, tenDanhMuc: 'Ăn uống' });

      const result = await service.findOne(1, 1);

      expect(result).toEqual({ id: 1, tenDanhMuc: 'Ăn uống' });
    });

    it('ném NotFoundException khi không tìm thấy', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne(999, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('ném NotFoundException khi danh mục không thuộc về user', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(
        service.update(1, 1, { tenDanhMuc: 'Mới' } as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('ném BadRequestException khi đổi tên trùng với danh mục khác', async () => {
      repo.findOne
        .mockResolvedValueOnce({
          id: 1,
          tenDanhMuc: 'Cũ',
          loai: LoaiDanhMuc.CHI,
          nguoiDungId: 1,
        })
        .mockResolvedValueOnce({ id: 2, tenDanhMuc: 'Mới' });

      await expect(
        service.update(1, 1, { tenDanhMuc: 'Mới' } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('cập nhật thành công khi hợp lệ', async () => {
      repo.findOne
        .mockResolvedValueOnce({
          id: 1,
          tenDanhMuc: 'Cũ',
          loai: LoaiDanhMuc.CHI,
          nguoiDungId: 1,
        })
        .mockResolvedValueOnce(null);

      const result = await service.update(1, 1, { tenDanhMuc: 'Mới' });

      expect(repo.save).toHaveBeenCalled();
      expect(result.tenDanhMuc).toBe('Mới');
    });
  });

  describe('remove', () => {
    it('ném NotFoundException khi không tìm thấy hoặc không có quyền', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.remove(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('xoá thành công khi tìm thấy', async () => {
      repo.findOne.mockResolvedValue({ id: 1, tenDanhMuc: 'Ăn uống' });

      const result = await service.remove(1, 1);

      expect(repo.remove).toHaveBeenCalled();
      expect(result.message).toContain('Ăn uống');
    });
  });
});
