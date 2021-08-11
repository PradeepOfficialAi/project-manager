// export class EmployeEntity {}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class EmployeEntity extends Document {
  @Prop({ required: true })
  employeCode!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  employeName!: string;

  @Prop({ default: Date.now })
  created!: Date;

  @Prop({ default: Date.now })
  updated!: Date;
}

export const EmployeEntitySchema = SchemaFactory.createForClass(EmployeEntity);

