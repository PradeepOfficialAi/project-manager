import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { Module } from '@nestjs/common';
import { EmployeeDTO } from './employee.dto';
import { EmployeeEntity } from './employee.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQuerySequelizeModule to register the entity with sequelize
      // and provide a QueryService
      imports: [NestjsQuerySequelizeModule.forFeature([EmployeeEntity])],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: EmployeeDTO, EntityClass: EmployeeEntity }],
    }),
  ],
})
export class EmployeeModule {}