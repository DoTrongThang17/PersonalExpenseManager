"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nganSachProviders = void 0;
const ngan_sach_entity_1 = require("./ngan-sach.entity");
exports.nganSachProviders = [
    {
        provide: 'NGAN_SACH_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(ngan_sach_entity_1.NganSach),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=ngan-sach.provider.js.map