import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, Between, IsNull } from 'typeorm';
import { GiaoDich } from './giao-dich.entity';
import { DanhMuc } from '../danh-muc/danh-muc.entity';
import { LoaiDanhMuc } from '../danh-muc/loai-danh-muc.enum';
import {
  CreateGiaoDichDto,
  UpdateGiaoDichDto,
  QueryGiaoDichDto,
} from './giao-dich.dto';

@Injectable()
export class GiaoDichService {
  constructor(
    @Inject('GIAO_DICH_REPOSITORY')
    private readonly giaoDichRepo: Repository<GiaoDich>,
    @Inject('DANH_MUC_REPOSITORY')
    private readonly danhMucRepo: Repository<DanhMuc>,
  ) {}

  /** Danh mục phải tồn tại, thuộc về user (hoặc là danh mục dùng chung),
   *  và loại danh mục (thu/chi) phải khớp loại giao dịch. */
  private async validateDanhMuc(
    danhMucId: number,
    nguoiDungId: number,
    loai: LoaiDanhMuc,
  ): Promise<DanhMuc> {
    const danhMuc = await this.danhMucRepo.findOne({
      where: [
        { id: danhMucId, nguoiDungId },
        { id: danhMucId, nguoiDungId: IsNull() },
      ],
    });
    if (!danhMuc) {
      throw new NotFoundException(
        `Không tìm thấy danh mục id=${danhMucId} hoặc bạn không có quyền dùng`,
      );
    }
    if (danhMuc.loai !== loai) {
      throw new BadRequestException(
        `Danh mục "${danhMuc.tenDanhMuc}" thuộc loại "${danhMuc.loai}", không thể gán cho giao dịch loại "${loai}"`,
      );
    }
    return danhMuc;
  }

  private static monthRange(thang: number, nam: number): [string, string] {
    const start = new Date(Date.UTC(nam, thang - 1, 1));
    const end = new Date(Date.UTC(nam, thang, 0));
    return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)];
  }

  // ── CREATE ──────────────────────────────────────────────────
  async create(nguoiDungId: number, dto: CreateGiaoDichDto): Promise<GiaoDich> {
    await this.validateDanhMuc(dto.danhMucId, nguoiDungId, dto.loai);
    const giaoDich = this.giaoDichRepo.create({ ...dto, nguoiDungId });
    return this.giaoDichRepo.save(giaoDich);
  }

  // ── READ ALL (có filter) ───────────────────────────────────
  async findAll(
    nguoiDungId: number,
    query: QueryGiaoDichDto,
  ): Promise<GiaoDich[]> {
    const where: Record<string, unknown> = { nguoiDungId };

    if (query.danhMucId) where.danhMucId = query.danhMucId;
    if (query.loai) where.loai = query.loai;

    if (query.thang && query.nam) {
      const [start, end] = GiaoDichService.monthRange(query.thang, query.nam);
      where.ngayGiaoDich = Between(start, end);
    } else if (query.nam) {
      where.ngayGiaoDich = Between(`${query.nam}-01-01`, `${query.nam}-12-31`);
    }

    return this.giaoDichRepo.find({
      where,
      relations: ['danhMuc'],
      order: { ngayGiaoDich: 'DESC', id: 'DESC' },
    });
  }

  // ── READ ONE ─────────────────────────────────────────────────
  async findOne(id: number, nguoiDungId: number): Promise<GiaoDich> {
    const giaoDich = await this.giaoDichRepo.findOne({
      where: { id, nguoiDungId },
      relations: ['danhMuc'],
    });
    if (!giaoDich) {
      throw new NotFoundException(`Không tìm thấy giao dịch id=${id}`);
    }
    return giaoDich;
  }

  // ── UPDATE ───────────────────────────────────────────────────
  async update(
    id: number,
    nguoiDungId: number,
    dto: UpdateGiaoDichDto,
  ): Promise<GiaoDich> {
    const giaoDich = await this.findOne(id, nguoiDungId);

    if (dto.danhMucId || dto.loai) {
      const newDanhMucId = dto.danhMucId ?? giaoDich.danhMucId;
      const newLoai = dto.loai ?? giaoDich.loai;
      await this.validateDanhMuc(newDanhMucId, nguoiDungId, newLoai);
    }

    Object.assign(giaoDich, dto);
    return this.giaoDichRepo.save(giaoDich);
  }

  // ── DELETE ───────────────────────────────────────────────────
  async remove(id: number, nguoiDungId: number): Promise<{ message: string }> {
    const giaoDich = await this.findOne(id, nguoiDungId);
    await this.giaoDichRepo.remove(giaoDich);
    return { message: `Đã xóa giao dịch id=${id}` };
  }

  // ── TỔNG HỢP THEO THÁNG (phục vụ dashboard) ───────────────────
  async tongHopTheoThang(nguoiDungId: number, thang: number, nam: number) {
    const [start, end] = GiaoDichService.monthRange(thang, nam);

    const giaoDichs = await this.giaoDichRepo.find({
      where: { nguoiDungId, ngayGiaoDich: Between(start, end) },
    });

    const tongThu = giaoDichs
      .filter((gd) => gd.loai === LoaiDanhMuc.THU)
      .reduce((sum, gd) => sum + Number(gd.soTien), 0);
    const tongChi = giaoDichs
      .filter((gd) => gd.loai === LoaiDanhMuc.CHI)
      .reduce((sum, gd) => sum + Number(gd.soTien), 0);

    return {
      thang,
      nam,
      tongThu,
      tongChi,
      chenhLech: tongThu - tongChi,
      soLuongGiaoDich: giaoDichs.length,
    };
  }
}
