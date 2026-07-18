import { DataSource } from 'typeorm';
import { STUDENT } from './student.entity';

export const studentProviders = [
  {
    provide: 'STUDENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(STUDENT),
    inject: ['DATA_SOURCE'],
  },
];
