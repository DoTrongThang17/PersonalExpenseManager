import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { DanhMucModule } from './danh-muc/danh-muc.module';
import { GiaoDichModule } from './giao-dich/giao-dich.module';
import { NganSachModule } from './ngan-sach/ngan-sach.module';
import { StudentModule } from './student/student.module';
import { TopicsModule } from './topics/topics.module';
import { AuthModule } from './auth/auth.module';
import { ApiTestModule } from './api-test/api-test.module';

@Module({
  imports: [
    DatabaseModule,
    NguoiDungModule,
    DanhMucModule,
    GiaoDichModule,
    NganSachModule,
    StudentModule,
    TopicsModule,
    AuthModule,
    ApiTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
