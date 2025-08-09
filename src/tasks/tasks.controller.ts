import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
import { IndexDto } from './dtos/index.dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  index(@Query() indexDto: IndexDto): Promise<Task[]> {
    return this.taskService.index(indexDto);
  }

  @Post()
  store(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.store(createTaskDto);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Task> {
    return this.taskService.show(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<object> {
    return this.taskService.delete(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Task | null> {
    return this.taskService.updateStatus(id, updateStatusDto);
  }
}
