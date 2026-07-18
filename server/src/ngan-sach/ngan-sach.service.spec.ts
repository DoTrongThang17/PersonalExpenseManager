import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { NganSachService } from './ngan-sach.service';

const mockNganSachRepo = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn((dto) => dto),
  save: jest.fn((entity) => Promise.resolve({ id: 1, ...entity })),
  remove: jest.fn((entity) => Promise.resolve(entity)),
});

describe('NganSachService', () => {
  let service: NganSachService;
  let repo: ReturnType<typeof mockNganSachRepo>;

  beforeEach(async () => {
    repo = mockNganSachRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NganSachService,
        { provide: 'NGAN_SACH_REPOSITORY', useValue: repo },
      ],
    }).compile();

    service = module.get<NganSachService>(NganSachService);
  });

  afterEach(() => jest.clearAllMocks());

  it('phải được định nghĩa', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = { danhMucId: 1, soTienGioiHan: 1000000, thang: 7, nam: 2026 };

    it('tạo ngân sách mới thành công', async () => {
      repo.findOne.mockResolvedValue(null);

      const result = await service.create(1, dto);

      expect(repo.save).toHaveBeenCalled();
      expect(result).toMatchObject({ nguoiDungId: 1, thang: 7, nam: 2026 });
    });

    it('ném ConflictException khi ngân sách tháng/danh mục đó đã tồn tại', async () => {
      repo.findOne.mockResolvedValue({ id: 9 });

      await expect(service.create(1, dto as any)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findOne', () => {
    it('ném NotFoundException khi không tìm thấy', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('trả về ngân sách khi tìm thấy đúng chủ sở hữu', async () => {
      repo.findOne.mockResolvedValue({
        id: 1,
        nguoiDungId: 1,
        thang: 7,
        nam: 2026,
      });

      const result = await service.findOne(1, 1);

      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('ném ConflictException khi đổi sang tháng/danh mục đã có ngân sách khác', async () => {
      // findOne (trong findOne nội bộ) trả về bản ghi hiện tại
      repo.findOne
        .mockResolvedValueOnce({
          id: 1,
          nguoiDungId: 1,
          danhMucId: 1,
          thang: 7,
          nam: 2026,
        })
        // check conflict cho tháng mới
        .mockResolvedValueOnce({ id: 2, thang: 8 });

      await expect(service.update(1, 1, { thang: 8 } as any)).rejects.toThrow(
        ConflictException,
      );
    });

    it('cập nhật thành công khi không xung đột', async () => {
      repo.findOne
        .mockResolvedValueOnce({
          id: 1,
          nguoiDungId: 1,
          danhMucId: 1,
          thang: 7,
          nam: 2026,
        })
        .mockResolvedValueOnce(null);

      const result = await service.update(1, 1, {
        soTienGioiHan: 2000000,
      });

      expect(repo.save).toHaveBeenCalled();
      expect(result.soTienGioiHan).toBe(2000000);
    });
  });

  describe('remove', () => {
    it('xoá thành công', async () => {
      repo.findOne.mockResolvedValue({
        id: 1,
        nguoiDungId: 1,
        thang: 7,
        nam: 2026,
      });

      const result = await service.remove(1, 1);

      expect(repo.remove).toHaveBeenCalled();
      expect(result.message).toContain('7/2026');
    });
  });
});
