import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement,
    DataType,
  } from 'sequelize-typescript';
  
  @Table
  export class DashboardEntity extends Model<DashboardEntity, Partial<DashboardEntity>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @Column
    dashboardId!: string;
  
    @Column({ type: DataType.ARRAY(DataType.JSONB) })
    dashboardArray!: JSON[];
  
    @CreatedAt
    created!: Date;
  
    @UpdatedAt
    updated!: Date;
  }
  