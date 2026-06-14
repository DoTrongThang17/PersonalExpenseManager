import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NganSachService } from './ngan-sach.service';
import { CreateNganSachDto, UpdateNganSachDto } from './ngan-sach.dto';

@Controller('ngan-sach')
export class NganSachController {
  constructor(private readonly nganSachService: NganSachService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateNganSachDto) {
    return this.nganSachService.create(1, dto);
  }

  @Get()
  findAll(
    @Query('thang') thang?: number,
    @Query('nam') nam?: number,
  ) {
    return this.nganSachService.findAll(1, thang, nam);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nganSachService.findOne(id, 1);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNganSachDto,
  ) {
    return this.nganSachService.update(id, 1, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nganSachService.remove(id, 1);
  }
}
