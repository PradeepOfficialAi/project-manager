import { FilterableField, IDField, QueryOptions, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID, Int } from '@nestjs/graphql';
import { EmployeeDTO } from 'src/employees/employee.dto';

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

  @Field(() => [String], { nullable: true })
  projectDevelopers!: string[];

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  created!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updated!: Date;
}

