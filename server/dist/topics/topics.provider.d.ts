import { DataSource } from 'typeorm';
import { TOPICS } from './topics.entity';
export declare const topicsProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<TOPICS>;
    inject: string[];
}[];
