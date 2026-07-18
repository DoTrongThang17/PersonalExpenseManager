import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Bật validate toàn cục: mọi DTO có decorator class-validator sẽ được
  // kiểm tra tự động, request sai định dạng bị chặn với lỗi 400 rõ ràng
  // trước khi chạm tới service/DB.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field lạ không khai báo trong DTO
      forbidNonWhitelisted: true, // báo lỗi nếu client gửi field lạ
      transform: true, // tự convert kiểu dữ liệu (vd: query string -> number)
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'dev-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000, // 1 giờ
      },
    }),
  );

  const port = process.env.PORT ?? 5000;

  await app.listen(port);

  console.log(`✅ Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start application:', err);
  process.exit(1);
});
