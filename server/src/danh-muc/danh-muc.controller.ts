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
  UseGuards,
} from '@nestjs/common';
import { DanhMucService } from './danh-muc.service';
import { CreateDanhMucDto, UpdateDanhMucDto } from './danh-muc.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('danh-muc')
export class DanhMucController {
  constructor(private readonly danhMucService: DanhMucService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreateDanhMucDto,
  ) {
    return this.danhMucService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUserPayload) {
    return this.danhMucService.findAll(user.userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.danhMucService.findOne(id, user.userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateDanhMucDto,
  ) {
    return this.danhMucService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.danhMucService.remove(id, user.userId);
  }
}
