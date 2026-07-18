import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GiaoDichController } from './giao-dich.controller';
import { GiaoDichService } from './giao-dich.service';
import { giaoDichProviders } from './giao-dich.provider';
import { danhMucProviders } from '../danh-muc/danh-muc.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GiaoDichController],
  providers: [GiaoDichService, ...giaoDichProviders, ...danhMucProviders],
  exports: [GiaoDichService],
})
export class GiaoDichModule {}
