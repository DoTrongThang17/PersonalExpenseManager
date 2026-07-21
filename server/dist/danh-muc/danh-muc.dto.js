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
exports.UpdateDanhMucDto = exports.CreateDanhMucDto = exports.LoaiDanhMuc = void 0;
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
var LoaiDanhMuc;
(function (LoaiDanhMuc) {
    LoaiDanhMuc["THU"] = "thu";
    LoaiDanhMuc["CHI"] = "chi";
})(LoaiDanhMuc || (exports.LoaiDanhMuc = LoaiDanhMuc = {}));
class CreateDanhMucDto {
    tenDanhMuc;
    moTa;
    loai;
    mauSac;
    bieuTuong;
}
exports.CreateDanhMucDto = CreateDanhMucDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên danh mục không được để trống' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên danh mục tối đa 100 ký tự' }),
    __metadata("design:type", String)
], CreateDanhMucDto.prototype, "tenDanhMuc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDanhMucDto.prototype, "moTa", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(LoaiDanhMuc, { message: 'Loại phải là "thu" hoặc "chi"' }),
    __metadata("design:type", String)
], CreateDanhMucDto.prototype, "loai", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
        message: 'Màu sắc phải là mã HEX hợp lệ, ví dụ: #FF5733',
    }),
    __metadata("design:type", String)
], CreateDanhMucDto.prototype, "mauSac", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateDanhMucDto.prototype, "bieuTuong", void 0);
class UpdateDanhMucDto extends (0, mapped_types_1.PartialType)(CreateDanhMucDto) {
}
exports.UpdateDanhMucDto = UpdateDanhMucDto;
//# sourceMappingURL=danh-muc.dto.js.map