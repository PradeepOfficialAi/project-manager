import { FilterableField, IDField, QueryOptions } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Employee')
@QueryOptions({ enableTotalCount: true })
export class EmployeeDTO {
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

  @Field(() => GraphQLISODateTime, { nullable: true })
  created!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updated!: Date;
}

