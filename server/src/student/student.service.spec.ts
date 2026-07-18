import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';

const mockStudentRepo = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn((dto) => dto),
  save: jest.fn((entity) => Promise.resolve(entity)),
  remove: jest.fn((entity) => Promise.resolve(entity)),
});

describe('StudentService', () => {
  let service: StudentService;
  let repo: ReturnType<typeof mockStudentRepo>;

  beforeEach(async () => {
    repo = mockStudentRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: 'STUDENT_REPOSITORY', useValue: repo },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  afterEach(() => jest.clearAllMocks());

  it('phải được định nghĩa', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      SID: 'SV001',
      SNAME: 'Nguyễn Văn A',
      EMAIL: 'a@example.com',
      Tutor_id: 'GV01',
    };

    it('tạo sinh viên mới thành công khi SID chưa tồn tại', async () => {
      repo.findOne.mockResolvedValue(null);

      const result = await service.create(dto);

      expect(repo.save).toHaveBeenCalled();
      expect(result.SID).toBe('SV001');
    });

    it('ném ConflictException khi SID đã tồn tại', async () => {
      repo.findOne.mockResolvedValue({ SID: 'SV001' });

      await expect(service.create(dto as any)).rejects.toThrow(
        ConflictException,
      );
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('trả về toàn bộ sinh viên (không lọc)', async () => {
      repo.find.mockResolvedValue([{ SID: 'SV001' }, { SID: 'SV002' }]);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalledWith();
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('ném NotFoundException khi không tìm thấy', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne('SV999')).rejects.toThrow(NotFoundException);
    });

    it('trả về sinh viên khi tìm thấy', async () => {
      repo.findOne.mockResolvedValue({ SID: 'SV001', SNAME: 'Nguyễn Văn A' });

      const result = await service.findOne('SV001');

      expect(result.SNAME).toBe('Nguyễn Văn A');
    });
  });

  describe('remove', () => {
    it('xoá thành công', async () => {
      repo.findOne.mockResolvedValue({ SID: 'SV001' });

      const result = await service.remove('SV001');

      expect(repo.remove).toHaveBeenCalled();
      expect(result.message).toContain('SV001');
    });
  });
});
