import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    create(dto: CreateStudentDto): Promise<import("./student.entity").STUDENT>;
    findAll(): Promise<import("./student.entity").STUDENT[]>;
    findOne(sid: string): Promise<import("./student.entity").STUDENT>;
    update(sid: string, dto: UpdateStudentDto): Promise<import("./student.entity").STUDENT>;
    remove(sid: string): Promise<{
        message: string;
    }>;
}
