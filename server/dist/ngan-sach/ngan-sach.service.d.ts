import { Repository } from 'typeorm';
import { NganSach } from './ngan-sach.entity';
import { CreateNganSachDto, UpdateNganSachDto } from './ngan-sach.dto';
export declare class NganSachService {
    private readonly nganSachRepo;
    constructor(nganSachRepo: Repository<NganSach>);
    create(nguoiDungId: number, dto: CreateNganSachDto): Promise<NganSach>;
    findAll(nguoiDungId: number, thang?: number, nam?: number): Promise<NganSach[]>;
    findOne(id: number, nguoiDungId: number): Promise<NganSach>;
    update(id: number, nguoiDungId: number, dto: UpdateNganSachDto): Promise<NganSach>;
    remove(id: number, nguoiDungId: number): Promise<{
        message: string;
    }>;
}
