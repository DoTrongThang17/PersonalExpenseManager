"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.danhMucProviders = void 0;
const danh_muc_entity_1 = require("./danh-muc.entity");
exports.danhMucProviders = [
    {
        provide: 'DANH_MUC_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(danh_muc_entity_1.DanhMuc),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=danh-muc.provider.js.map