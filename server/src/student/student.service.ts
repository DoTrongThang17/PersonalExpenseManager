import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { STUDENT } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepository: Repository<STUDENT>,
  ) {}

  async create(dto: CreateStudentDto): Promise<STUDENT> {
    const existed = await this.studentRepository.findOne({
      where: { SID: dto.SID },
    });
    if (existed) {
      throw new ConflictException(`Mã sinh viên "${dto.SID}" đã tồn tại`);
    }
    const student = this.studentRepository.create(dto);
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<STUDENT[]> {
    return this.studentRepository.find();
  }

  async findOne(sid: string): Promise<STUDENT> {
    const student = await this.studentRepository.findOne({
      where: { SID: sid },
    });
    if (!student) {
      throw new NotFoundException(`Không tìm thấy sinh viên có mã "${sid}"`);
    }
    return student;
  }

  async update(sid: string, dto: UpdateStudentDto): Promise<STUDENT> {
    const student = await this.findOne(sid);
    Object.assign(student, dto);
    return this.studentRepository.save(student);
  }

  async remove(sid: string): Promise<{ message: string }> {
    const student = await this.findOne(sid);
    await this.studentRepository.remove(student);
    return { message: `Đã xoá sinh viên có mã "${sid}"` };
  }
}
