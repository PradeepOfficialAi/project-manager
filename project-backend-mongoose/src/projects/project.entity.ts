import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class ProjectEntity extends Document {
  @Prop()
  projectName!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'EmployeEntity', required: true })
  projectLeader?: Types.ObjectId;

  @Prop()
  projectDevelopers!: string;

  @Prop({ default: Date.now })
  startDate!: Date;

  @Prop({ default: Date.now })
  endDate!: Date;
  
  @Prop({ default: Date.now })
  created!: Date;

  @Prop({ default: Date.now })
  updated!: Date;
}

export const ProjectEntitySchema = SchemaFactory.createForClass(ProjectEntity);
