import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { Module } from '@nestjs/common';
import { ProjectDTO } from './project.dto';
import { ProjectEntity } from './project.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQuerySequelizeModule to register the entity with sequelize
      // and provide a QueryService
      imports: [NestjsQuerySequelizeModule.forFeature([ProjectEntity])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: ProjectDTO, EntityClass: ProjectEntity }],
    }),
  ],
})
export class ProjectModule {}