import { FilterableField, IDField, KeySet, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { ProjectDto } from 'src/projects/project.dto';

@ObjectType('Employe')
// @KeySet(['id'])
// disable the remove because a sub task cannot exist without a todoitem
@Relation('projectLeader', () => ProjectDto, { disableRemove: true })
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

