import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { IndexDto } from './dtos/index.dto';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async findAll(indexDto: IndexDto): Promise<Task[]> {
    const { search, status } = indexDto;

    const query = this.repo.createQueryBuilder('tasks');
    if (search) {
      query.andWhere(
        'LOWER(tasks.title) like LOWER(:search) OR LOWER(tasks.description) like LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    if (status) {
      query.andWhere('tasks.status =:status', { status });
    }
    return await query.getMany();
  }

  async findOneById(id: string): Promise<Task | null> {
    return this.repo.findOneBy({ id });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create(createTaskDto);
    return this.repo.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async updateStatus(id: string, status: TaskStatus): Promise<void> {
    await this.repo.update(id, { status });
  }
}
