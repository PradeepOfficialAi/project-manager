import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeModule } from './employe/employe.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/task.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/project'),
    GraphQLModule.forRoot({
      autoSchemaFile: join('src/schema.gql'),
      // set to true to automatically generate schema
      sortSchema: true,
    }),
    EmployeModule,
    ProjectsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

