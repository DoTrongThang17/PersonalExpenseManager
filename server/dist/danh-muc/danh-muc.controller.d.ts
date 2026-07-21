import { DanhMucService } from './danh-muc.service';
import { CreateDanhMucDto, UpdateDanhMucDto } from './danh-muc.dto';
export declare class DanhMucController {
    private readonly danhMucService;
    constructor(danhMucService: DanhMucService);
    create(dto: CreateDanhMucDto): Promise<import("./danh-muc.entity").DanhMuc>;
    findAll(): Promise<import("./danh-muc.entity").DanhMuc[]>;
    findOne(id: number): Promise<import("./danh-muc.entity").DanhMuc>;
    update(id: number, dto: UpdateDanhMucDto): Promise<import("./danh-muc.entity").DanhMuc>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
