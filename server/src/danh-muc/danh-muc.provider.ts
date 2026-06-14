import { DataSource } from 'typeorm';
import { DanhMuc } from './danh-muc.entity';

export const danhMucProviders = [
  {
    provide: 'DANH_MUC_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DanhMuc),
    inject: ['DATA_SOURCE'],
  },
];
