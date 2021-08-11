import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { ProjectDto } from './project.dto';
import { ProjectEntity, ProjectEntitySchema } from './project.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: ProjectEntity, name: ProjectEntity.name, schema: ProjectEntitySchema },
        ]),
      ],
      resolvers: [{ DTOClass: ProjectDto, EntityClass: ProjectEntity }],
    }),
  ],
})
export class ProjectsModule {}