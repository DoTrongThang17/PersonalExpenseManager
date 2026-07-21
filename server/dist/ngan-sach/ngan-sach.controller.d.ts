import { NganSachService } from './ngan-sach.service';
import { CreateNganSachDto, UpdateNganSachDto } from './ngan-sach.dto';
export declare class NganSachController {
    private readonly nganSachService;
    constructor(nganSachService: NganSachService);
    create(dto: CreateNganSachDto): Promise<import("./ngan-sach.entity").NganSach>;
    findAll(thang?: number, nam?: number): Promise<import("./ngan-sach.entity").NganSach[]>;
    findOne(id: number): Promise<import("./ngan-sach.entity").NganSach>;
    update(id: number, dto: UpdateNganSachDto): Promise<import("./ngan-sach.entity").NganSach>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
