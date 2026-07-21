import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { GiaoDich } from '../giao-dich/giao-dich.entity';
import { NganSach } from '../ngan-sach/ngan-sach.entity';
export declare enum LoaiDanhMuc {
    THU = "thu",
    CHI = "chi"
}
export declare class DanhMuc {
    id: number;
    nguoiDungId: number | null;
    tenDanhMuc: string;
    moTa: string;
    loai: LoaiDanhMuc;
    mauSac: string;
    bieuTuong: string;
    ngayTao: Date;
    ngayCapNhat: Date;
    nguoiDung: NguoiDung;
    giaoDichs: GiaoDich[];
    nganSachs: NganSach[];
}
