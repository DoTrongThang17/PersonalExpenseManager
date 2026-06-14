import { DataSource } from 'typeorm';
import { NganSach } from './ngan-sach.entity';

export const nganSachProviders = [
  {
    provide: 'NGAN_SACH_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NganSach),
    inject: ['DATA_SOURCE'],
  },
];
