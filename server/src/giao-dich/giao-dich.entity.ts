import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { DanhMuc } from '../danh-muc/danh-muc.entity';
import { LoaiDanhMuc } from '../danh-muc/loai-danh-muc.enum';

@Entity('GiaoDich')
export class GiaoDich {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nguoi_dung_id' })
  nguoiDungId: number;

  @Column({ name: 'danh_muc_id' })
  danhMucId: number;

  @ManyToOne(() => NguoiDung, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nguoi_dung_id' })
  nguoiDung: NguoiDung;

  @ManyToOne(() => DanhMuc, (dm) => dm.giaoDichs, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'danh_muc_id' })
  danhMuc: DanhMuc;

  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'so_tien' })
  soTien: number;

  @Column({ type: 'enum', enum: LoaiDanhMuc })
  loai: LoaiDanhMuc;

  @Column({ type: 'text', nullable: true })
  moTa: string;

  // Lưu ý: cột kiểu 'date' - TypeORM/mysql2 trả về dạng chuỗi 'YYYY-MM-DD'
  // (không phải object Date đầy đủ giờ/phút/giây), nên khai báo string cho khớp.
  @Column({ type: 'date', name: 'ngay_giao_dich' })
  ngayGiaoDich: string;

  @Column({ name: 'hinh_anh_hoa_don', length: 500, nullable: true })
  hinhAnhHoaDon: string;

  @CreateDateColumn({ name: 'ngay_tao' })
  ngayTao: Date;

  @UpdateDateColumn({ name: 'ngay_cap_nhat' })
  ngayCapNhat: Date;
}
