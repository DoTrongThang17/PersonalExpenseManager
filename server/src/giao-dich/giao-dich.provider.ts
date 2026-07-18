import { DataSource } from 'typeorm';
import { GiaoDich } from './giao-dich.entity';

export const giaoDichProviders = [
  {
    provide: 'GIAO_DICH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GiaoDich),
    inject: ['DATA_SOURCE'],
  },
];
