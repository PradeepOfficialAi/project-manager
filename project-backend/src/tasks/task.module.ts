import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TasksEntity, TasksEntitySchema } from './task.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryMongooseModule to register the entity with mongoose
      // and provide a QueryService
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: TasksEntity, name: TasksEntity.name, schema: TasksEntitySchema },
        ]),
      ],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: TaskDto, EntityClass: TasksEntity }],
    }),
  ],
})
export class TasksModule {}