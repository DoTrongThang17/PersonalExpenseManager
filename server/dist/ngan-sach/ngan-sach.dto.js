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
exports.UpdateNganSachDto = exports.CreateNganSachDto = void 0;
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateNganSachDto {
    danhMucId;
    soTienGioiHan;
    thang;
    nam;
    ghiChu;
}
exports.CreateNganSachDto = CreateNganSachDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Mã danh mục phải là số nguyên' }),
    (0, class_validator_1.IsPositive)({ message: 'Mã danh mục phải lớn hơn 0' }),
    __metadata("design:type", Number)
], CreateNganSachDto.prototype, "danhMucId", void 0);
__decorate([
    (0, class_validator_1.IsPositive)({ message: 'Số tiền giới hạn phải lớn hơn 0' }),
    __metadata("design:type", Number)
], CreateNganSachDto.prototype, "soTienGioiHan", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Tháng phải từ 1 đến 12' }),
    (0, class_validator_1.Max)(12, { message: 'Tháng phải từ 1 đến 12' }),
    __metadata("design:type", Number)
], CreateNganSachDto.prototype, "thang", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000, { message: 'Năm không hợp lệ' }),
    (0, class_validator_1.Max)(2100, { message: 'Năm không hợp lệ' }),
    __metadata("design:type", Number)
], CreateNganSachDto.prototype, "nam", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNganSachDto.prototype, "ghiChu", void 0);
class UpdateNganSachDto extends (0, mapped_types_1.PartialType)(CreateNganSachDto) {
}
exports.UpdateNganSachDto = UpdateNganSachDto;
//# sourceMappingURL=ngan-sach.dto.js.map