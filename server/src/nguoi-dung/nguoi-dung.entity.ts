import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DanhMuc } from '../danh-muc/danh-muc.entity';

@Entity('nguoi_dung')
export class NguoiDung {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ho_ten: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mat_khau: string;

  @Column()
  so_dien_thoai: string;

  @OneToMany(() => DanhMuc, (dm) => dm.nguoiDung)
  danhMucs: DanhMuc[];
}
