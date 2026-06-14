import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsModule } from './topics/topics.module';
import { DatabaseModule } from './database/database.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
  imports: [NguoiDungModule],
})
export class AppModule {}
