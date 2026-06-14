import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { DanhMucService } from './danh-muc.service';
import { CreateDanhMucDto, UpdateDanhMucDto } from './danh-muc.dto';

@Controller('danh-muc')
export class DanhMucController {
  constructor(private readonly danhMucService: DanhMucService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateDanhMucDto) {
    return this.danhMucService.create(1, dto);
  }

  @Get()
  findAll() {
    return this.danhMucService.findAll(1);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.danhMucService.findOne(id, 1);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDanhMucDto,
  ) {
    return this.danhMucService.update(id, 1, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.danhMucService.remove(id, 1);
  }
}
