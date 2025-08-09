import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { IndexDto } from './dtos/index.dto';
import { TasksRepository } from './task-repository';
import { UpdateStatusDto } from './dtos/update-status.dto';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  async show(id: string): Promise<Task> {
    const task: Task | null = await this.taskRepository.findOneById(id);
    console.log(task);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async index(indexDto: IndexDto): Promise<Task[]> {
    return this.taskRepository.findAll(indexDto);
  }

  async store(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = {
      title,
      description,
      status: TaskStatus.OPEN,
    };

    return this.taskRepository.createTask(task);
  }

  async delete(id: string): Promise<object> {
    const task = await this.taskRepository.findOneById(id);
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
  ): Promise<Task | null> {
    const task = await this.taskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.updateStatus(id, updateStatusDto.status);
    return await this.taskRepository.findOneById(id);
  }
}
