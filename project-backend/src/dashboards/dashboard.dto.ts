import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { JSONB, STRING } from 'sequelize/types';
import graphqlTypeJson from "graphql-type-json";
@ObjectType('Dashboard')
export class DashboardDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  dashboardId!: string;

  @Field(() => graphqlTypeJson, { nullable: true })
  dashboardArray!: object;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}

