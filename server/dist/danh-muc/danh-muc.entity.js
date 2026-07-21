"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanhMuc = exports.LoaiDanhMuc = void 0;
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("../nguoi-dung/nguoi-dung.entity");
const giao_dich_entity_1 = require("../giao-dich/giao-dich.entity");
const ngan_sach_entity_1 = require("../ngan-sach/ngan-sach.entity");
var LoaiDanhMuc;
(function (LoaiDanhMuc) {
    LoaiDanhMuc["THU"] = "thu";
    LoaiDanhMuc["CHI"] = "chi";
})(LoaiDanhMuc || (exports.LoaiDanhMuc = LoaiDanhMuc = {}));
let DanhMuc = class DanhMuc {
    id;
    nguoiDungId;
    tenDanhMuc;
    moTa;
    loai;
    mauSac;
    bieuTuong;
    ngayTao;
    ngayCapNhat;
    nguoiDung;
    giaoDichs;
    nganSachs;
};
exports.DanhMuc = DanhMuc;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DanhMuc.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nguoi_dung_id', nullable: true }),
    __metadata("design:type", Object)
], DanhMuc.prototype, "nguoiDungId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ten_danh_muc', length: 100 }),
    __metadata("design:type", String)
], DanhMuc.prototype, "tenDanhMuc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DanhMuc.prototype, "moTa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: LoaiDanhMuc, default: LoaiDanhMuc.CHI }),
    __metadata("design:type", String)
], DanhMuc.prototype, "loai", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mau_sac', length: 10, nullable: true }),
    __metadata("design:type", String)
], DanhMuc.prototype, "mauSac", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bieu_tuong', length: 50, nullable: true }),
    __metadata("design:type", String)
], DanhMuc.prototype, "bieuTuong", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'ngay_tao' }),
    __metadata("design:type", Date)
], DanhMuc.prototype, "ngayTao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'ngay_cap_nhat' }),
    __metadata("design:type", Date)
], DanhMuc.prototype, "ngayCapNhat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nguoi_dung_entity_1.NguoiDung, (nd) => nd.danhMucs, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'nguoi_dung_id' }),
    __metadata("design:type", nguoi_dung_entity_1.NguoiDung)
], DanhMuc.prototype, "nguoiDung", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => giao_dich_entity_1.GiaoDich, (gd) => gd.danhMuc),
    __metadata("design:type", Array)
], DanhMuc.prototype, "giaoDichs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ngan_sach_entity_1.NganSach, (ns) => ns.danhMuc),
    __metadata("design:type", Array)
], DanhMuc.prototype, "nganSachs", void 0);
exports.DanhMuc = DanhMuc = __decorate([
    (0, typeorm_1.Entity)('DanhMuc')
], DanhMuc);
//# sourceMappingURL=danh-muc.entity.js.map