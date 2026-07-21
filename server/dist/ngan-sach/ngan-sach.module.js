"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NganSachModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const ngan_sach_controller_1 = require("./ngan-sach.controller");
const ngan_sach_service_1 = require("./ngan-sach.service");
const ngan_sach_provider_1 = require("./ngan-sach.provider");
let NganSachModule = class NganSachModule {
};
exports.NganSachModule = NganSachModule;
exports.NganSachModule = NganSachModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [ngan_sach_controller_1.NganSachController],
        providers: [ngan_sach_service_1.NganSachService, ...ngan_sach_provider_1.nganSachProviders],
        exports: [ngan_sach_service_1.NganSachService],
    })
], NganSachModule);
//# sourceMappingURL=ngan-sach.module.js.map