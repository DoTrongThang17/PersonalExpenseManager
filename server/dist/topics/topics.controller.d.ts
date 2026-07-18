import { TopicsService } from './topics.service';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';
export declare class TopicsController {
    private readonly topicsService;
    constructor(topicsService: TopicsService);
    create(dto: CreateTopicDto): Promise<import("./topics.entity").TOPICS>;
    findAll(): Promise<import("./topics.entity").TOPICS[]>;
    findOne(tid: number): Promise<import("./topics.entity").TOPICS>;
    update(tid: number, dto: UpdateTopicDto): Promise<import("./topics.entity").TOPICS>;
    remove(tid: number): Promise<{
        message: string;
    }>;
}
