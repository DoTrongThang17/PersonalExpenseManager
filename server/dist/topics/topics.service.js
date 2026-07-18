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
exports.TopicsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let TopicsService = class TopicsService {
    topicsRepository;
    constructor(topicsRepository) {
        this.topicsRepository = topicsRepository;
    }
    async create(dto) {
        const existed = await this.topicsRepository.findOne({
            where: { TId: dto.TId },
        });
        if (existed) {
            throw new common_1.ConflictException(`Mã chủ đề "${dto.TId}" đã tồn tại`);
        }
        const topic = this.topicsRepository.create(dto);
        return this.topicsRepository.save(topic);
    }
    async findAll() {
        return this.topicsRepository.find();
    }
    async findOne(tid) {
        const topic = await this.topicsRepository.findOne({ where: { TId: tid } });
        if (!topic) {
            throw new common_1.NotFoundException(`Không tìm thấy chủ đề có mã "${tid}"`);
        }
        return topic;
    }
    async update(tid, dto) {
        const topic = await this.findOne(tid);
        Object.assign(topic, dto);
        return this.topicsRepository.save(topic);
    }
    async remove(tid) {
        const topic = await this.findOne(tid);
        await this.topicsRepository.remove(topic);
        return { message: `Đã xoá chủ đề có mã "${tid}"` };
    }
};
exports.TopicsService = TopicsService;
exports.TopicsService = TopicsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TOPICS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TopicsService);
//# sourceMappingURL=topics.service.js.map