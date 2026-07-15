import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { NguoiDung } from '../nguoi-dung/nguoi-dung.entity';
import { DanhMuc } from '../danh-muc/danh-muc.entity';
import { GiaoDich } from '../giao-dich/giao-dich.entity';
import { NganSach } from '../ngan-sach/ngan-sach.entity';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = Number(process.env.DB_PORT || '3306');
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'quan_ly_chi_tieu';

const sslConfig =
  process.env.DB_SSL === 'true'
    ? {
        ca: fs.readFileSync(
          path.join(process.cwd(), 'assets', 'ca.pem'),
          'utf8',
        ),
      }
    : undefined;

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: dbHost,
        port: dbPort,
        username: dbUser,
        password: dbPassword,
        database: dbName,
        entities: [NguoiDung, DanhMuc, GiaoDich, NganSach],
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
