import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, IsNull } from 'typeorm';
import { DanhMuc } from './danh-muc.entity';
import { CreateDanhMucDto, UpdateDanhMucDto } from './danh-muc.dto';

@Injectable()
export class DanhMucService {
  constructor(
    @Inject('DANH_MUC_REPOSITORY')
    private readonly danhMucRepo: Repository<DanhMuc>,
  ) {}

  // ── CREATE ──────────────────────────────────────────────────
  async create(nguoiDungId: number, dto: CreateDanhMucDto): Promise<DanhMuc> {
    const existing = await this.danhMucRepo.findOne({
      where: { nguoiDungId, tenDanhMuc: dto.tenDanhMuc, loai: dto.loai },
    });
    if (existing) {
      throw new BadRequestException(
        `Danh mục "${dto.tenDanhMuc}" loại "${dto.loai}" đã tồn tại`,
      );
    }
    const danhMuc = this.danhMucRepo.create({ ...dto, nguoiDungId });
    return this.danhMucRepo.save(danhMuc);
  }

  // ── READ ALL ─────────────────────────────────────────────────
  async findAll(nguoiDungId: number): Promise<DanhMuc[]> {
    return this.danhMucRepo.find({
      where: [{ nguoiDungId: IsNull() }, { nguoiDungId }],
      order: { loai: 'ASC', tenDanhMuc: 'ASC' },
    });
  }

  // ── READ ONE ─────────────────────────────────────────────────
  async findOne(id: number, nguoiDungId: number): Promise<DanhMuc> {
    const danhMuc = await this.danhMucRepo.findOne({
      where: [
        { id, nguoiDungId: IsNull() },
        { id, nguoiDungId },
      ],
    });
    if (!danhMuc) {
      throw new NotFoundException(`Không tìm thấy danh mục id=${id}`);
    }
    return danhMuc;
  }

  // ── UPDATE ───────────────────────────────────────────────────
  async update(
    id: number,
    nguoiDungId: number,
    dto: UpdateDanhMucDto,
  ): Promise<DanhMuc> {
    const danhMuc = await this.danhMucRepo.findOne({
      where: { id, nguoiDungId },
    });
    if (!danhMuc) {
      throw new NotFoundException(
        `Không tìm thấy danh mục id=${id} hoặc không có quyền sửa`,
      );
    }
    if (dto.tenDanhMuc && dto.tenDanhMuc !== danhMuc.tenDanhMuc) {
      const dup = await this.danhMucRepo.findOne({
        where: {
          nguoiDungId,
          tenDanhMuc: dto.tenDanhMuc,
          loai: dto.loai ?? danhMuc.loai,
        },
      });
      if (dup)
        throw new BadRequestException(`Tên "${dto.tenDanhMuc}" đã tồn tại`);
    }
    Object.assign(danhMuc, dto);
    return this.danhMucRepo.save(danhMuc);
  }

  // ── DELETE ───────────────────────────────────────────────────
  async remove(id: number, nguoiDungId: number): Promise<{ message: string }> {
    const danhMuc = await this.danhMucRepo.findOne({
      where: { id, nguoiDungId },
    });
    if (!danhMuc) {
      throw new NotFoundException(
        `Không tìm thấy danh mục id=${id} hoặc không có quyền xóa`,
      );
    }
    await this.danhMucRepo.remove(danhMuc);
    return { message: `Đã xóa danh mục "${danhMuc.tenDanhMuc}" thành công` };
  }
}
