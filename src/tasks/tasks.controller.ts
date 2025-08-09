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
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/users.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  index(@Query() indexDto: IndexDto, @GetUser() user: User): Promise<Task[]> {
    return this.taskService.index(indexDto, user);
  }

  @Post()
  store(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.store(createTaskDto, user);
  }

  @Get(':id')
  async show(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    console.log('User', user);
    return this.taskService.show(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: User): Promise<object> {
    return this.taskService.delete(id, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @GetUser() user: User,
  ): Promise<Task | null> {
    return this.taskService.updateStatus(id, updateStatusDto, user);
  }
}
