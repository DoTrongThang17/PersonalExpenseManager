import { Controller, Post, Body } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';

@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly service: NguoiDungService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }
}
