import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Module } from '@nestjs/common';
import { EmployeDto } from './employe.dto';
import { EmployeEntity, EmployeEntitySchema } from './employe.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryMongooseModule to register the entity with mongoose
      // and provide a QueryService
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: EmployeEntity, name: EmployeEntity.name, schema: EmployeEntitySchema },
        ]),
      ],
      // describe the resolvers you want to expose
      resolvers: [{ DTOClass: EmployeDto, EntityClass: EmployeEntity }],
    }),
  ],
})
export class EmployeModule {}