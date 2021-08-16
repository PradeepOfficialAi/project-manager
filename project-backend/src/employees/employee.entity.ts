import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';
  
  @Table
  export class EmployeeEntity extends Model<EmployeeEntity, Partial<EmployeeEntity>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;
      
  @Column
  employeName!: string;

  @Column
  employeCode!: string;

  @Column
  employeEmail!: string;

  @Column
  employeDesignation!: string;

  @Column
  employeAddress!: string;

  @CreatedAt
  created!: Date;

  @UpdatedAt
  updated!: Date;
  }
  