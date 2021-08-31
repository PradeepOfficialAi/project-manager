import { FilterableField, IDField, QueryOptions, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID, Int } from '@nestjs/graphql';
// import { JSONB } from 'sequelize/types';
import { EmployeeDTO } from 'src/employees/employee.dto';
import graphqlTypeJson from "graphql-type-json";

@ObjectType('Project')
@QueryOptions({ enableTotalCount: true })
@Relation('projectLeader', () => EmployeeDTO, { nullable: true })
export class ProjectDTO {
  @IDField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  projectName!: string;

  @FilterableField(() => Int, { nullable: true })
  projectLeaderId!: number;

  @Field(() => graphqlTypeJson, { nullable: true })
  projectDevelopers!: object;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  created!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updated!: Date;
}

