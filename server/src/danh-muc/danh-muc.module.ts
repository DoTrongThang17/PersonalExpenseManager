import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DanhMucController } from './danh-muc.controller';
import { DanhMucService } from './danh-muc.service';
import { danhMucProviders } from './danh-muc.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DanhMucController],
  providers: [DanhMucService, ...danhMucProviders],
  exports: [DanhMucService],
})
export class DanhMucModule {}
