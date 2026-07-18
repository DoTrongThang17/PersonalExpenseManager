import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GiaoDichService } from './giao-dich.service';
import { LoaiDanhMuc } from '../danh-muc/danh-muc.entity';

const mockGiaoDichRepo = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn((dto) => dto),
  save: jest.fn((entity) => Promise.resolve({ id: 1, ...entity })),
  remove: jest.fn((entity) => Promise.resolve(entity)),
});

const mockDanhMucRepo = () => ({
  findOne: jest.fn(),
});

describe('GiaoDichService', () => {
  let service: GiaoDichService;
  let giaoDichRepo: ReturnType<typeof mockGiaoDichRepo>;
  let danhMucRepo: ReturnType<typeof mockDanhMucRepo>;

  beforeEach(async () => {
    giaoDichRepo = mockGiaoDichRepo();
    danhMucRepo = mockDanhMucRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiaoDichService,
        { provide: 'GIAO_DICH_REPOSITORY', useValue: giaoDichRepo },
        { provide: 'DANH_MUC_REPOSITORY', useValue: danhMucRepo },
      ],
    }).compile();

    service = module.get<GiaoDichService>(GiaoDichService);
  });

  afterEach(() => jest.clearAllMocks());

  it('phải được định nghĩa', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      danhMucId: 1,
      soTien: 50000,
      loai: LoaiDanhMuc.CHI,
      ngayGiaoDich: '2026-07-15',
    };

    it('tạo giao dịch thành công khi danh mục hợp lệ và cùng loại', async () => {
      danhMucRepo.findOne.mockResolvedValue({
        id: 1,
        tenDanhMuc: 'Ăn uống',
        loai: LoaiDanhMuc.CHI,
      });

      const result = await service.create(1, dto);

      expect(giaoDichRepo.save).toHaveBeenCalled();
      expect(result).toMatchObject({ nguoiDungId: 1, soTien: 50000 });
    });

    it('ném NotFoundException khi danh mục không tồn tại / không thuộc về user', async () => {
      danhMucRepo.findOne.mockResolvedValue(null);

      await expect(service.create(1, dto as any)).rejects.toThrow(
        NotFoundException,
      );
      expect(giaoDichRepo.save).not.toHaveBeenCalled();
    });

    it('ném BadRequestException khi loại giao dịch không khớp loại danh mục', async () => {
      // Danh mục là loại "thu" nhưng giao dịch khai báo "chi"
      danhMucRepo.findOne.mockResolvedValue({
        id: 1,
        tenDanhMuc: 'Lương',
        loai: LoaiDanhMuc.THU,
      });

      await expect(service.create(1, dto as any)).rejects.toThrow(
        BadRequestException,
      );
      expect(giaoDichRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('ném NotFoundException khi không tìm thấy hoặc không phải chủ sở hữu', async () => {
      giaoDichRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('xoá thành công khi đúng chủ sở hữu', async () => {
      giaoDichRepo.findOne.mockResolvedValue({ id: 1, nguoiDungId: 1 });

      const result = await service.remove(1, 1);

      expect(giaoDichRepo.remove).toHaveBeenCalled();
      expect(result.message).toContain('1');
    });
  });

  describe('tongHopTheoThang', () => {
    it('tính đúng tổng thu, tổng chi, chênh lệch trong tháng', async () => {
      giaoDichRepo.find.mockResolvedValue([
        { soTien: 10000000, loai: LoaiDanhMuc.THU },
        { soTien: 2000000, loai: LoaiDanhMuc.CHI },
        { soTien: 500000, loai: LoaiDanhMuc.CHI },
      ]);

      const result = await service.tongHopTheoThang(1, 7, 2026);

      expect(result.tongThu).toBe(10000000);
      expect(result.tongChi).toBe(2500000);
      expect(result.chenhLech).toBe(7500000);
      expect(result.soLuongGiaoDich).toBe(3);
    });

    it('trả về 0 khi tháng đó không có giao dịch nào', async () => {
      giaoDichRepo.find.mockResolvedValue([]);

      const result = await service.tongHopTheoThang(1, 1, 2026);

      expect(result).toMatchObject({ tongThu: 0, tongChi: 0, chenhLech: 0 });
    });
  });
});
