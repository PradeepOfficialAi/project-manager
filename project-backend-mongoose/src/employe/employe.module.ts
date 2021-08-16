import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { EmployeDto } from './employe.dto';
import { EmployeEntity, EmployeEntitySchema } from './employe.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: EmployeEntity, name: EmployeEntity.name, schema: EmployeEntitySchema },
        ]),
      ],
      resolvers: [{ DTOClass: EmployeDto, EntityClass: EmployeEntity }],
    }),
  ],
})
export class EmployeModule {}