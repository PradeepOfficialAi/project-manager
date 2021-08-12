import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Employe')
export class EmployeDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField({nullable: true})
  employeName!: string;

  @FilterableField({nullable: true})
  employeCode!: string;

  @FilterableField({nullable: true})
  employeEmail!: string;

  @FilterableField({nullable: true})
  employeDesignation!: string;

  @FilterableField({nullable: true})
  employeAddress!: string;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}

