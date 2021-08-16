import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    DataType,
  } from 'sequelize-typescript';
import { EmployeeEntity } from 'src/employees/employee.entity';
import { ProjectEntity } from 'src/projects/project.entity';
  
  @Table
  export class TaskEntity extends Model<TaskEntity, Partial<TaskEntity>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    taskName!: string;
  
    @Column
    @ForeignKey(() => ProjectEntity)
    projectNameId: number;

    @BelongsTo(() => ProjectEntity, 'projectNameId')
    projectName: ProjectEntity;
    
    // @Column
    // @ForeignKey(() => EmployeeEntity)
    // taskDevelopersId: number

    // @BelongsTo(() => EmployeeEntity, 'taskDevelopersId')
    // taskDevelopers!: EmployeeEntity;

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    taskDevelopers!: string[];
  
    @Column
    startDate!: Date;
  
    @Column
    endDate!: Date;
  
    @CreatedAt
    created!: Date;
  
    @UpdatedAt
    updated!: Date;
  }
  