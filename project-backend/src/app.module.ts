import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employees/employees.module';
import { ProjectModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { DashboardsModule } from './dashboards/dashboards.module';

@Module({
  imports: [
    EmployeeModule,
    SequelizeModule.forRoot({
      host: 'localhost',
      port:5432,
      dialect: 'postgres',
      database: 'projects',
      username: 'postgres',
      password: 'root',
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      // set to true to automatically generate schema
      autoSchemaFile: join('src/schema.gql'),
      sortSchema:true
    }),
    ProjectModule,
    TasksModule,
    DashboardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

