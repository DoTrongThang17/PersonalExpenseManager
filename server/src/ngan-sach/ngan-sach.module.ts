import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NganSachController } from './ngan-sach.controller';
import { NganSachService } from './ngan-sach.service';
import { nganSachProviders } from './ngan-sach.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NganSachController],
  providers: [NganSachService, ...nganSachProviders],
  exports: [NganSachService],
})
export class NganSachModule {}
