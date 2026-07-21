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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanhMucService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DanhMucService = class DanhMucService {
    danhMucRepo;
    constructor(danhMucRepo) {
        this.danhMucRepo = danhMucRepo;
    }
    async create(nguoiDungId, dto) {
        const existing = await this.danhMucRepo.findOne({
            where: { nguoiDungId, tenDanhMuc: dto.tenDanhMuc, loai: dto.loai },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Danh mục "${dto.tenDanhMuc}" loại "${dto.loai}" đã tồn tại`);
        }
        const danhMuc = this.danhMucRepo.create({ ...dto, nguoiDungId });
        return this.danhMucRepo.save(danhMuc);
    }
    async findAll(nguoiDungId) {
        return this.danhMucRepo.find({
            where: [{ nguoiDungId: (0, typeorm_1.IsNull)() }, { nguoiDungId }],
            order: { loai: 'ASC', tenDanhMuc: 'ASC' },
        });
    }
    async findOne(id, nguoiDungId) {
        const danhMuc = await this.danhMucRepo.findOne({
            where: [{ id, nguoiDungId: (0, typeorm_1.IsNull)() }, { id, nguoiDungId }],
        });
        if (!danhMuc) {
            throw new common_1.NotFoundException(`Không tìm thấy danh mục id=${id}`);
        }
        return danhMuc;
    }
    async update(id, nguoiDungId, dto) {
        const danhMuc = await this.danhMucRepo.findOne({
            where: { id, nguoiDungId },
        });
        if (!danhMuc) {
            throw new common_1.NotFoundException(`Không tìm thấy danh mục id=${id} hoặc không có quyền sửa`);
        }
        if (dto.tenDanhMuc && dto.tenDanhMuc !== danhMuc.tenDanhMuc) {
            const dup = await this.danhMucRepo.findOne({
                where: { nguoiDungId, tenDanhMuc: dto.tenDanhMuc, loai: dto.loai ?? danhMuc.loai },
            });
            if (dup)
                throw new common_1.BadRequestException(`Tên "${dto.tenDanhMuc}" đã tồn tại`);
        }
        Object.assign(danhMuc, dto);
        return this.danhMucRepo.save(danhMuc);
    }
    async remove(id, nguoiDungId) {
        const danhMuc = await this.danhMucRepo.findOne({
            where: { id, nguoiDungId },
        });
        if (!danhMuc) {
            throw new common_1.NotFoundException(`Không tìm thấy danh mục id=${id} hoặc không có quyền xóa`);
        }
        await this.danhMucRepo.remove(danhMuc);
        return { message: `Đã xóa danh mục "${danhMuc.tenDanhMuc}" thành công` };
    }
};
exports.DanhMucService = DanhMucService;
exports.DanhMucService = DanhMucService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DANH_MUC_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DanhMucService);
//# sourceMappingURL=danh-muc.service.js.map