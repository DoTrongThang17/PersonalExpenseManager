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
  UseGuards,
} from '@nestjs/common';
import { GiaoDichService } from './giao-dich.service';
import {
  CreateGiaoDichDto,
  UpdateGiaoDichDto,
  QueryGiaoDichDto,
} from './giao-dich.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('giao-dich')
export class GiaoDichController {
  constructor(private readonly giaoDichService: GiaoDichService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreateGiaoDichDto,
  ) {
    return this.giaoDichService.create(user.userId, dto);
  }

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserPayload,
    @Query() query: QueryGiaoDichDto,
  ) {
    return this.giaoDichService.findAll(user.userId, query);
  }

  // Route tĩnh 'tong-hop' PHẢI khai báo trước route động ':id',
  // nếu không Nest sẽ hiểu "tong-hop" là 1 giá trị :id.
  @Get('tong-hop')
  tongHop(
    @CurrentUser() user: CurrentUserPayload,
    @Query('thang', ParseIntPipe) thang: number,
    @Query('nam', ParseIntPipe) nam: number,
  ) {
    return this.giaoDichService.tongHopTheoThang(user.userId, thang, nam);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.giaoDichService.findOne(id, user.userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateGiaoDichDto,
  ) {
    return this.giaoDichService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.giaoDichService.remove(id, user.userId);
  }
}
