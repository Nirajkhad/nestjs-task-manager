import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'task-management-postgres',
      port: 5432,
      username: 'postgres',
      password: 'Taskm*n@gmen!',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
