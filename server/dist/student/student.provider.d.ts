import { DataSource } from 'typeorm';
import { STUDENT } from './student.entity';
export declare const studentProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<STUDENT>;
    inject: string[];
}[];
