import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto, UpdateNguoiDungDto } from './nguoi-dung.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';

@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly service: NguoiDungService) {}

  // Đăng ký tài khoản - PHẢI để công khai, không được gắn guard
  @Post()
  create(@Body() createDto: CreateNguoiDungDto) {
    return this.service.create(createDto);
  }

  // Danh sách người dùng - yêu cầu đăng nhập.
  // Lưu ý: trong 1 hệ thống thật, route này nên giới hạn cho admin;
  // project hiện chưa có khái niệm role nên tạm để mọi user đã đăng nhập xem.
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.service.findOne(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: UpdateNguoiDungDto,
  ) {
    return this.service.update(id, user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.service.remove(id, user.userId);
  }
}
