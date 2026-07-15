import { Module } from '@nestjs/common';
import { NguoiDungController } from './nguoi-dung.controller';
import { NguoiDungService } from './nguoi-dung.service';
import { DatabaseModule } from '../database/database.module';
import { nguoiDungProviders } from './nguoi-dung.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NguoiDungController],
  providers: [...nguoiDungProviders, NguoiDungService],
  exports: [NguoiDungService],
})
export class NguoiDungModule {}
