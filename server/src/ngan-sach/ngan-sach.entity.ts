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

@Entity('NganSach')
@Unique('uq_nganSach_user_cat_period', ['nguoiDungId', 'danhMucId', 'thang', 'nam'])
export class NganSach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nguoi_dung_id' })
  nguoiDungId: number;

  @Column({ name: 'danh_muc_id' })
  danhMucId: number;

  @Column({ name: 'so_tien_gioi_han', type: 'decimal', precision: 15, scale: 2 })
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
