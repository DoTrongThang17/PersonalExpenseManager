import { Repository } from 'typeorm';
import { DanhMuc } from './danh-muc.entity';
import { CreateDanhMucDto, UpdateDanhMucDto } from './danh-muc.dto';
export declare class DanhMucService {
    private readonly danhMucRepo;
    constructor(danhMucRepo: Repository<DanhMuc>);
    create(nguoiDungId: number, dto: CreateDanhMucDto): Promise<DanhMuc>;
    findAll(nguoiDungId: number): Promise<DanhMuc[]>;
    findOne(id: number, nguoiDungId: number): Promise<DanhMuc>;
    update(id: number, nguoiDungId: number, dto: UpdateDanhMucDto): Promise<DanhMuc>;
    remove(id: number, nguoiDungId: number): Promise<{
        message: string;
    }>;
}
