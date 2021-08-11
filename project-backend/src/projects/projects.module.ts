// import { Module } from '@nestjs/common';

// @Module({})
// export class ProjectsModule {}

import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { ProjectDto } from './project.dto';
import { ProjectEntity, ProjectEntitySchema } from './project.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryMongooseModule to register the entity with mongoose
      // and provide a QueryService
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: ProjectEntity, name: ProjectEntity.name, schema: ProjectEntitySchema },
        ]),
      ],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: ProjectDto, EntityClass: ProjectEntity }],
    }),
  ],
})
export class ProjectsModule {}