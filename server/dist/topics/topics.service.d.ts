import { Repository } from 'typeorm';
import { TOPICS } from './topics.entity';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';
export declare class TopicsService {
    private readonly topicsRepository;
    constructor(topicsRepository: Repository<TOPICS>);
    create(dto: CreateTopicDto): Promise<TOPICS>;
    findAll(): Promise<TOPICS[]>;
    findOne(tid: number): Promise<TOPICS>;
    update(tid: number, dto: UpdateTopicDto): Promise<TOPICS>;
    remove(tid: number): Promise<{
        message: string;
    }>;
}
