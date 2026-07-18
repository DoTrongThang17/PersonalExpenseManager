import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TOPICS } from './topics.entity';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';

@Injectable()
export class TopicsService {
  constructor(
    @Inject('TOPICS_REPOSITORY')
    private readonly topicsRepository: Repository<TOPICS>,
  ) {}

  async create(dto: CreateTopicDto): Promise<TOPICS> {
    const existed = await this.topicsRepository.findOne({
      where: { TId: dto.TId },
    });
    if (existed) {
      throw new ConflictException(`Mã chủ đề "${dto.TId}" đã tồn tại`);
    }
    const topic = this.topicsRepository.create(dto);
    return this.topicsRepository.save(topic);
  }

  async findAll(): Promise<TOPICS[]> {
    return this.topicsRepository.find();
  }

  async findOne(tid: number): Promise<TOPICS> {
    const topic = await this.topicsRepository.findOne({ where: { TId: tid } });
    if (!topic) {
      throw new NotFoundException(`Không tìm thấy chủ đề có mã "${tid}"`);
    }
    return topic;
  }

  async update(tid: number, dto: UpdateTopicDto): Promise<TOPICS> {
    const topic = await this.findOne(tid);
    Object.assign(topic, dto);
    return this.topicsRepository.save(topic);
  }

  async remove(tid: number): Promise<{ message: string }> {
    const topic = await this.findOne(tid);
    await this.topicsRepository.remove(topic);
    return { message: `Đã xoá chủ đề có mã "${tid}"` };
  }
}
