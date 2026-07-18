import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { DanhMuc } from '../danh-muc/danh-muc.entity';

@Entity('NganSach')
@Unique('uq_nganSach_user_cat_period', [
  'nguoiDungId',
  'danhMucId',
  'thang',
  'nam',
])
export class NganSach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nguoi_dung_id' })
  nguoiDungId: number;

  @Column({ name: 'danh_muc_id' })
  danhMucId: number;

  @ManyToOne(() => DanhMuc, (dm) => dm.nganSachs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'danh_muc_id' })
  danhMuc: DanhMuc;

  @Column({
    name: 'so_tien_gioi_han',
    type: 'decimal',
    precision: 15,
    scale: 2,
  })
  soTienGioiHan: number;

  @Column({ type: 'tinyint' })
  thang: number;

  @Column({ type: 'year' })
  nam: number;

  @Column({ type: 'text', nullable: true, name: 'ghi_chu' })
  ghiChu: string;

  @CreateDateColumn({ name: 'ngay_tao' })
  ngayTao: Date;

  @UpdateDateColumn({ name: 'ngay_cap_nhat' })
  ngayCapNhat: Date;
}
