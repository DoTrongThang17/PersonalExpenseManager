import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTopicDto) {
    return this.topicsService.create(dto);
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':tid')
  findOne(@Param('tid', ParseIntPipe) tid: number) {
    return this.topicsService.findOne(tid);
  }

  @Put(':tid')
  update(@Param('tid', ParseIntPipe) tid: number, @Body() dto: UpdateTopicDto) {
    return this.topicsService.update(tid, dto);
  }

  @Delete(':tid')
  remove(@Param('tid', ParseIntPipe) tid: number) {
    return this.topicsService.remove(tid);
  }
}
