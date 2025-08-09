import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TasksModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'mySecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'task-management-postgres',
      port: 5432,
      username: 'postgres',
      password: 'Taskm*n@gmen!',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
