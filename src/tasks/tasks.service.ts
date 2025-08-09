import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { IndexDto } from './dtos/index.dto';
import { TasksRepository } from './task-repository';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { User } from '../auth/users.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  async show(id: string, user: User): Promise<Task> {
    const task: Task | null = await this.taskRepository.findOneById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async index(indexDto: IndexDto, user: User): Promise<Task[]> {
    return this.taskRepository.findAll(indexDto, user);
  }

  async store(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = {
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    };

    return this.taskRepository.createTask(task);
  }

  async delete(id: string, user: User): Promise<object> {
    const task = await this.taskRepository.findOneById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.deleteTask(id);
    return {
      message: `Task with id ${id} deleted`,
    };
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
    user: User,
  ): Promise<Task | null> {
    const task = await this.taskRepository.findOneById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.updateStatus(id, updateStatusDto.status, user);
    return await this.taskRepository.findOneById(id, user);
  }
}
