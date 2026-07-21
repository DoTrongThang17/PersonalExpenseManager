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
exports.NganSachService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let NganSachService = class NganSachService {
    nganSachRepo;
    constructor(nganSachRepo) {
        this.nganSachRepo = nganSachRepo;
    }
    async create(nguoiDungId, dto) {
        const existing = await this.nganSachRepo.findOne({
            where: { nguoiDungId, danhMucId: dto.danhMucId, thang: dto.thang, nam: dto.nam },
        });
        if (existing) {
            throw new common_1.ConflictException(`Đã tồn tại ngân sách cho danh mục này trong tháng ${dto.thang}/${dto.nam}`);
        }
        const nganSach = this.nganSachRepo.create({ ...dto, nguoiDungId });
        return this.nganSachRepo.save(nganSach);
    }
    async findAll(nguoiDungId, thang, nam) {
        const where = { nguoiDungId };
        if (thang)
            where.thang = thang;
        if (nam)
            where.nam = nam;
        return this.nganSachRepo.find({
            where,
            order: { nam: 'DESC', thang: 'DESC' },
        });
    }
    async findOne(id, nguoiDungId) {
        const nganSach = await this.nganSachRepo.findOne({ where: { id, nguoiDungId } });
        if (!nganSach) {
            throw new common_1.NotFoundException(`Không tìm thấy ngân sách id=${id}`);
        }
        return nganSach;
    }
    async update(id, nguoiDungId, dto) {
        const nganSach = await this.findOne(id, nguoiDungId);
        const newThang = dto.thang ?? nganSach.thang;
        const newNam = dto.nam ?? nganSach.nam;
        const newDmId = dto.danhMucId ?? nganSach.danhMucId;
        const changed = newThang !== nganSach.thang || newNam !== nganSach.nam || newDmId !== nganSach.danhMucId;
        if (changed) {
            const conflict = await this.nganSachRepo.findOne({
                where: { nguoiDungId, danhMucId: newDmId, thang: newThang, nam: newNam },
            });
            if (conflict && conflict.id !== id) {
                throw new common_1.ConflictException(`Đã tồn tại ngân sách cho tháng ${newThang}/${newNam}`);
            }
        }
        Object.assign(nganSach, dto);
        return this.nganSachRepo.save(nganSach);
    }
    async remove(id, nguoiDungId) {
        const nganSach = await this.findOne(id, nguoiDungId);
        await this.nganSachRepo.remove(nganSach);
        return { message: `Đã xóa ngân sách tháng ${nganSach.thang}/${nganSach.nam}` };
    }
};
exports.NganSachService = NganSachService;
exports.NganSachService = NganSachService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NGAN_SACH_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], NganSachService);
//# sourceMappingURL=ngan-sach.service.js.map