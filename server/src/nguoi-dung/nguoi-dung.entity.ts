import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
