import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class TasksEntity extends Document {
  @Prop({ required: true })
  taskName!: string;

  @Prop()
  projectName?: string;

  @Prop({ required: true })
  employeName!: string;

  @Prop({ default: Date.now })
  startDate!: Date;

  @Prop({ default: Date.now })
  endDate!: Date;

  @Prop({ default: Date.now })
  created!: Date;

  @Prop({ default: Date.now })
  updated!: Date;
}

export const TasksEntitySchema = SchemaFactory.createForClass(TasksEntity);
