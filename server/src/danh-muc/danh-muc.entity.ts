import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { GiaoDich } from '../giao-dich/giao-dich.entity';
import { NganSach } from '../ngan-sach/ngan-sach.entity';
import { LoaiDanhMuc } from './loai-danh-muc.enum';

export { LoaiDanhMuc };

@Entity('DanhMuc')
export class DanhMuc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nguoi_dung_id', nullable: true })
  nguoiDungId: number | null;

  @Column({ name: 'ten_danh_muc', length: 100 })
  tenDanhMuc: string;

  @Column({ type: 'text', nullable: true })
  moTa: string;

  @Column({ type: 'enum', enum: LoaiDanhMuc, default: LoaiDanhMuc.CHI })
  loai: LoaiDanhMuc;

  @Column({ name: 'mau_sac', length: 10, nullable: true })
  mauSac: string;

  @Column({ name: 'bieu_tuong', length: 50, nullable: true })
  bieuTuong: string;

  @CreateDateColumn({ name: 'ngay_tao' })
  ngayTao: Date;

  @UpdateDateColumn({ name: 'ngay_cap_nhat' })
  ngayCapNhat: Date;

  // Relations
  @ManyToOne(() => NguoiDung, (nd) => nd.danhMucs, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'nguoi_dung_id' })
  nguoiDung: NguoiDung;

  @OneToMany(() => GiaoDich, (gd) => gd.danhMuc)
  giaoDichs: GiaoDich[];

  @OneToMany(() => NganSach, (ns) => ns.danhMuc)
  nganSachs: NganSach[];
}
