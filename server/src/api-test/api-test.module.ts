import { Module } from '@nestjs/common';
import { ApiTestController } from './api-test.controller';

@Module({
  controllers: [ApiTestController],
})
export class ApiTestModule {}
