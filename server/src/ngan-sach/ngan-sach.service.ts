import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NganSach } from './ngan-sach.entity';
import { CreateNganSachDto, UpdateNganSachDto } from './ngan-sach.dto';

@Injectable()
export class NganSachService {
  constructor(
    @Inject('NGAN_SACH_REPOSITORY')
    private readonly nganSachRepo: Repository<NganSach>,
  ) {}

  // ── CREATE ──────────────────────────────────────────────────
  async create(nguoiDungId: number, dto: CreateNganSachDto): Promise<NganSach> {
    const existing = await this.nganSachRepo.findOne({
      where: { nguoiDungId, danhMucId: dto.danhMucId, thang: dto.thang, nam: dto.nam },
    });
    if (existing) {
      throw new ConflictException(
        `Đã tồn tại ngân sách cho danh mục này trong tháng ${dto.thang}/${dto.nam}`,
      );
    }
    const nganSach = this.nganSachRepo.create({ ...dto, nguoiDungId });
    return this.nganSachRepo.save(nganSach);
  }

  // ── READ ALL ─────────────────────────────────────────────────
  async findAll(nguoiDungId: number, thang?: number, nam?: number): Promise<NganSach[]> {
    const where: any = { nguoiDungId };
    if (thang) where.thang = thang;
    if (nam) where.nam = nam;
    return this.nganSachRepo.find({
      where,
      order: { nam: 'DESC', thang: 'DESC' },
    });
  }

  // ── READ ONE ─────────────────────────────────────────────────
  async findOne(id: number, nguoiDungId: number): Promise<NganSach> {
    const nganSach = await this.nganSachRepo.findOne({ where: { id, nguoiDungId } });
    if (!nganSach) {
      throw new NotFoundException(`Không tìm thấy ngân sách id=${id}`);
    }
    return nganSach;
  }

  // ── UPDATE ───────────────────────────────────────────────────
  async update(id: number, nguoiDungId: number, dto: UpdateNganSachDto): Promise<NganSach> {
    const nganSach = await this.findOne(id, nguoiDungId);
    const newThang = dto.thang ?? nganSach.thang;
    const newNam   = dto.nam   ?? nganSach.nam;
    const newDmId  = dto.danhMucId ?? nganSach.danhMucId;
    const changed  = newThang !== nganSach.thang || newNam !== nganSach.nam || newDmId !== nganSach.danhMucId;
    if (changed) {
      const conflict = await this.nganSachRepo.findOne({
        where: { nguoiDungId, danhMucId: newDmId, thang: newThang, nam: newNam },
      });
      if (conflict && conflict.id !== id) {
        throw new ConflictException(`Đã tồn tại ngân sách cho tháng ${newThang}/${newNam}`);
      }
    }
    Object.assign(nganSach, dto);
    return this.nganSachRepo.save(nganSach);
  }

  // ── DELETE ───────────────────────────────────────────────────
  async remove(id: number, nguoiDungId: number): Promise<{ message: string }> {
    const nganSach = await this.findOne(id, nguoiDungId);
    await this.nganSachRepo.remove(nganSach);
    return { message: `Đã xóa ngân sách tháng ${nganSach.thang}/${nganSach.nam}` };
  }
}
