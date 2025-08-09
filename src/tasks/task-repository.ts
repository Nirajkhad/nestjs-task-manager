import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { IndexDto } from './dtos/index.dto';
import { User } from '../auth/users.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async findAll(indexDto: IndexDto, user: User): Promise<Task[]> {
    const { search, status } = indexDto;

    const query = this.repo.createQueryBuilder('tasks');
    if (search) {
      query.andWhere(
        '(LOWER(tasks.title) like LOWER(:search) OR LOWER(tasks.description) like LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    if (status) {
      query.andWhere('tasks.status =:status', { status });
    }

    return await query.andWhere({ user }).getMany();
  }

  async findOneById(id: string, user: User): Promise<Task | null> {
    return this.repo.findOneBy({ id, user });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create(createTaskDto);
    return this.repo.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async updateStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<void> {
    await this.repo.update(id, { status, user });
  }
}
