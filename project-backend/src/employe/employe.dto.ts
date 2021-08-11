// export class EmployeDto {}
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Employe')
export class EmployeDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  employeCode!: string;

  @FilterableField()
  employeName!: string;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}

