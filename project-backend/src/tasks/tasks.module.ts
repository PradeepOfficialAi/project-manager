import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { Module } from '@nestjs/common';
import { TaskDTO } from './task.dto';
import { TaskEntity } from './task.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQuerySequelizeModule to register the entity with sequelize
      // and provide a QueryService
      imports: [NestjsQuerySequelizeModule.forFeature([TaskEntity])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: TaskDTO, EntityClass: TaskEntity }],
    }),
  ],
})
export class TasksModule {}