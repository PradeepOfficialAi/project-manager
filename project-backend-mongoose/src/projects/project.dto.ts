import { CursorConnection, FilterableField, IDField, KeySet } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { EmployeDto } from 'src/employe/employe.dto';

@ObjectType('Projects')
// @KeySet(['id'])
@CursorConnection('employes', () => EmployeDto, { disableRemove: true })
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

