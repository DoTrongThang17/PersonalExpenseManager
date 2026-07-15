import { DataSource } from 'typeorm';
import { NguoiDung } from './nguoi-dung.entity';

export const nguoiDungProviders = [
  {
    provide: 'NGUOI_DUNG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(NguoiDung),
    inject: ['DATA_SOURCE'],
  },
];
