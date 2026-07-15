import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TOPICS } from './topics.entity';

@Injectable()
export class TopicsService {
  constructor(
    @Inject('TOPICS_REPOSITORY')
    private topicsRepository: Repository<TOPICS>,
  ) {}
  async findAll(): Promise<TOPICS[]> {
    const tid = await this.topicsRepository.findBy({
      TId: 101,
    });
    return tid;
  }
  async getTopics(): Promise<TOPICS[]> {
    return this.topicsRepository.find();
  }
  getStudent(): string {
    return 'Ke mac doi Hello World!';
  }
}
