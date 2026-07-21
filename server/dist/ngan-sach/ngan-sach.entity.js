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
exports.NganSach = void 0;
const typeorm_1 = require("typeorm");
let NganSach = class NganSach {
    id;
    nguoiDungId;
    danhMucId;
    soTienGioiHan;
    thang;
    nam;
    ghiChu;
    ngayTao;
    ngayCapNhat;
};
exports.NganSach = NganSach;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NganSach.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nguoi_dung_id' }),
    __metadata("design:type", Number)
], NganSach.prototype, "nguoiDungId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'danh_muc_id' }),
    __metadata("design:type", Number)
], NganSach.prototype, "danhMucId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'so_tien_gioi_han', type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], NganSach.prototype, "soTienGioiHan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint' }),
    __metadata("design:type", Number)
], NganSach.prototype, "thang", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'year' }),
    __metadata("design:type", Number)
], NganSach.prototype, "nam", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'ghi_chu' }),
    __metadata("design:type", String)
], NganSach.prototype, "ghiChu", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'ngay_tao' }),
    __metadata("design:type", Date)
], NganSach.prototype, "ngayTao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'ngay_cap_nhat' }),
    __metadata("design:type", Date)
], NganSach.prototype, "ngayCapNhat", void 0);
exports.NganSach = NganSach = __decorate([
    (0, typeorm_1.Entity)('NganSach'),
    (0, typeorm_1.Unique)('uq_nganSach_user_cat_period', ['nguoiDungId', 'danhMucId', 'thang', 'nam'])
], NganSach);
//# sourceMappingURL=ngan-sach.entity.js.map