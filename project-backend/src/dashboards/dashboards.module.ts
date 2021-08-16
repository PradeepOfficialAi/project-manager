import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { Module } from '@nestjs/common';
import { DashboardDTO } from './dashboard.dto';
import { DashboardEntity } from './dashboard.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQuerySequelizeModule to register the entity with sequelize
      // and provide a QueryService
      imports: [NestjsQuerySequelizeModule.forFeature([DashboardEntity])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: DashboardDTO, EntityClass: DashboardEntity }],
    }),
  ],
})
export class DashboardsModule {}