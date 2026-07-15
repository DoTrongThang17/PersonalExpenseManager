import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TopicsModule } from './topics/topics.module';
import { DatabaseModule } from './database/database.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { AuthModule } from './auth/auth.module';
import { ApiTestModule } from './api-test/api-test.module';

@Module({
  imports: [
    DatabaseModule,
    NguoiDungModule,
    TopicsModule,
    AuthModule,
    ApiTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}