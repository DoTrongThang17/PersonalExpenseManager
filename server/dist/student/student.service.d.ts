import { Repository } from 'typeorm';
import { STUDENT } from './student.entity';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
export declare class StudentService {
    private readonly studentRepository;
    constructor(studentRepository: Repository<STUDENT>);
    create(dto: CreateStudentDto): Promise<STUDENT>;
    findAll(): Promise<STUDENT[]>;
    findOne(sid: string): Promise<STUDENT>;
    update(sid: string, dto: UpdateStudentDto): Promise<STUDENT>;
    remove(sid: string): Promise<{
        message: string;
    }>;
}
