import { FilterableField, IDField, QueryOptions, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, ID, Int } from '@nestjs/graphql';
import { EmployeeDTO } from 'src/employees/employee.dto';
import { ProjectDTO } from 'src/projects/project.dto';

@ObjectType('Task')
@QueryOptions({ enableTotalCount: true })
@Relation('projectName', () => ProjectDTO, { nullable: true })
export class TaskDTO {
    @IDField(() => ID)
    id!: number;
  
    @FilterableField({ nullable: true })
    taskName!: string;
  
    // @FilterableField()
    // projectName!: string;
  
    @FilterableField(() => Int, { nullable: true })
    projectNameId!: number;

    // @FilterableField(() => Int, { nullable: true })
    // taskDevelopersId: number

    @Field(() => [String], { nullable: true })
    taskDevelopers!: string[];
    // @FilterableField()
    // taskDevelopers!: string;
  
    @Field(() => GraphQLISODateTime, { nullable: true })
    startDate!: Date;
  
    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate!: Date;
  
    @Field(() => GraphQLISODateTime, { nullable: true })
    created!: Date;
  
    @Field(() => GraphQLISODateTime, { nullable: true })
    updated!: Date;
}

