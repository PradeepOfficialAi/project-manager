import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class EmployeEntity extends Document {
  
  @Prop({ required: true })
  employeName!: string;

  @Prop()
  employeCode!: string;

  @Prop()
  employeEmail!: string;

  @Prop()
  employeDesignation!: string;

  @Prop()
  employeAddress!: string;

  @Prop({ default: Date.now })
  created!: Date;

  @Prop({ default: Date.now })
  updated!: Date;
}

export const EmployeEntitySchema = SchemaFactory.createForClass(EmployeEntity);

