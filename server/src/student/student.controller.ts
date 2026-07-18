import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':sid')
  findOne(@Param('sid') sid: string) {
    return this.studentService.findOne(sid);
  }

  @Put(':sid')
  update(@Param('sid') sid: string, @Body() dto: UpdateStudentDto) {
    return this.studentService.update(sid, dto);
  }

  @Delete(':sid')
  remove(@Param('sid') sid: string) {
    return this.studentService.remove(sid);
  }
}
