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
import { NganSachService } from './ngan-sach.service';
import { CreateNganSachDto, UpdateNganSachDto } from './ngan-sach.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('ngan-sach')
export class NganSachController {
  constructor(private readonly nganSachService: NganSachService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreateNganSachDto,
  ) {
    return this.nganSachService.create(user.userId, dto);
  }

  @Get()
  findAll(
    @CurrentUser() user: CurrentUserPayload,
    @Query('thang') thang?: string,
    @Query('nam') nam?: string,
  ) {
    return this.nganSachService.findAll(
      user.userId,
      thang ? Number(thang) : undefined,
      nam ? Number(nam) : undefined,
    );
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.nganSachService.findOne(id, user.userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateNganSachDto,
  ) {
    return this.nganSachService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.nganSachService.remove(id, user.userId);
  }
}
