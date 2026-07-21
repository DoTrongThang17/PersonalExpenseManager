import { DataSource } from 'typeorm';
import { NganSach } from './ngan-sach.entity';
export declare const nganSachProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<NganSach>;
    inject: string[];
}[];
