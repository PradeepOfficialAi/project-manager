import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TasksEntity, TasksEntitySchema } from './task.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: TasksEntity, name: TasksEntity.name, schema: TasksEntitySchema },
        ]),
      ],
      resolvers: [{ DTOClass: TaskDto, EntityClass: TasksEntity }],
    }),
  ],
})
export class TasksModule {}