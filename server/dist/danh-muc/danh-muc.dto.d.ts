export declare enum LoaiDanhMuc {
    THU = "thu",
    CHI = "chi"
}
export declare class CreateDanhMucDto {
    tenDanhMuc: string;
    moTa?: string;
    loai: LoaiDanhMuc;
    mauSac?: string;
    bieuTuong?: string;
}
declare const UpdateDanhMucDto_base: any;
export declare class UpdateDanhMucDto extends UpdateDanhMucDto_base {
}
export {};
