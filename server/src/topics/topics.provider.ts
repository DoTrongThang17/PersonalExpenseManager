import { DataSource } from 'typeorm';
import { TOPICS } from './topics.entity';

export const topicsProviders = [
  {
    provide: 'TOPICS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TOPICS),
    inject: ['DATA_SOURCE'],
  },
];
