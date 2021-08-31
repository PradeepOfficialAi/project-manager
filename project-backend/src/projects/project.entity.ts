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
  
  @Table
  export class ProjectEntity extends Model<ProjectEntity, Partial<ProjectEntity>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    projectName!: string;
  
    @Column
    @ForeignKey(() => EmployeeEntity)
    projectLeaderId:number;

    @BelongsTo(() => EmployeeEntity, 'projectLeaderId')
    projectLeader: EmployeeEntity
  
    @Column({ type: DataType.ARRAY(DataType.JSONB) })
    projectDevelopers!: JSON[];
  
    @Column
    startDate!: Date;
  
    @Column
    endDate!: Date;
    
    @CreatedAt
    created!: Date;
  
    @UpdatedAt
    updated!: Date;
  }
  