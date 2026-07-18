"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("../nguoi-dung/nguoi-dung.entity");
const danh_muc_entity_1 = require("../danh-muc/danh-muc.entity");
const giao_dich_entity_1 = require("../giao-dich/giao-dich.entity");
const ngan_sach_entity_1 = require("../ngan-sach/ngan-sach.entity");
const topics_entity_1 = require("../topics/topics.entity");
const student_entity_1 = require("../student/student.entity");
dotenv.config();
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = Number(process.env.DB_PORT || '3306');
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'quan_ly_chi_tieu';
const sslConfig = process.env.DB_SSL === 'true'
    ? {
        ca: fs.readFileSync(path.join(process.cwd(), 'assets', 'ca.pem'), 'utf8'),
    }
    : undefined;
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: dbHost,
                port: dbPort,
                username: dbUser,
                password: dbPassword,
                database: dbName,
                entities: [nguoi_dung_entity_1.NguoiDung, danh_muc_entity_1.DanhMuc, giao_dich_entity_1.GiaoDich, ngan_sach_entity_1.NganSach, topics_entity_1.TOPICS, student_entity_1.STUDENT],
                synchronize: true,
                ssl: sslConfig,
                logging: true,
            });
            await dataSource.initialize();
            console.log('===================================');
            console.log('✅ Database connected successfully!');
            console.log(`Host: ${dbHost}`);
            console.log(`Database: ${dbName}`);
            console.log('===================================');
            return dataSource;
        },
    },
];
//# sourceMappingURL=database.providers.js.map