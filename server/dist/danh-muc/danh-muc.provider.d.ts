import { DataSource } from 'typeorm';
import { DanhMuc } from './danh-muc.entity';
export declare const danhMucProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<DanhMuc>;
    inject: string[];
}[];
