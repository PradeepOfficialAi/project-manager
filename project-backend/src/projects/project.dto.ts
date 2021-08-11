// export class ProjectDto {}

import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';

@ObjectType('Projects')
export class ProjectDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  projectName!: string;

  @FilterableField()
  projectLeader!: string;

  @FilterableField()
  projectDevelopers!: string;

  @Field(() => GraphQLISODateTime)
  startDate!: Date;

  @Field(() => GraphQLISODateTime)
  endDate!: Date;

  @Field(() => GraphQLISODateTime)
  created!: Date;

  @Field(() => GraphQLISODateTime)
  updated!: Date;
}

