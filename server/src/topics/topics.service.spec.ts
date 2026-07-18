import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { TopicsService } from './topics.service';

const mockTopicsRepo = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn((dto) => dto),
  save: jest.fn((entity) => Promise.resolve(entity)),
  remove: jest.fn((entity) => Promise.resolve(entity)),
});

describe('TopicsService', () => {
  let service: TopicsService;
  let repo: ReturnType<typeof mockTopicsRepo>;

  beforeEach(async () => {
    repo = mockTopicsRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicsService,
        { provide: 'TOPICS_REPOSITORY', useValue: repo },
      ],
    }).compile();

    service = module.get<TopicsService>(TopicsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('phải được định nghĩa', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = { TId: 101, Tdesc: 'Nhập môn lập trình', Mod_Id: 'CS101' };

    it('tạo chủ đề mới thành công khi TId chưa tồn tại', async () => {
      repo.findOne.mockResolvedValue(null);

      const result = await service.create(dto);

      expect(repo.save).toHaveBeenCalled();
      expect(result.TId).toBe(101);
    });

    it('ném ConflictException khi TId đã tồn tại', async () => {
      repo.findOne.mockResolvedValue({ TId: 101 });

      await expect(service.create(dto as any)).rejects.toThrow(
        ConflictException,
      );
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('trả về toàn bộ chủ đề', async () => {
      repo.find.mockResolvedValue([{ TId: 101 }, { TId: 102 }]);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('ném NotFoundException khi không tìm thấy', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('cập nhật thành công', async () => {
      repo.findOne.mockResolvedValue({
        TId: 101,
        Tdesc: 'Cũ',
        Mod_Id: 'CS101',
      });

      const result = await service.update(101, { Tdesc: 'Mới' });

      expect(repo.save).toHaveBeenCalled();
      expect(result.Tdesc).toBe('Mới');
    });
  });

  describe('remove', () => {
    it('xoá thành công', async () => {
      repo.findOne.mockResolvedValue({ TId: 101 });

      const result = await service.remove(101);

      expect(repo.remove).toHaveBeenCalled();
      expect(result.message).toContain('101');
    });
  });
});
