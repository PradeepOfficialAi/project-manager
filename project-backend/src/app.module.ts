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
    MongooseModule.forRoot('mongodb+srv://pradeep:root@cluster0.p6dye.mongodb.net/project?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile: join('src/schema.gql'),
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

