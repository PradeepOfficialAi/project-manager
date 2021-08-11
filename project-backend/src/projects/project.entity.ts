import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class ProjectEntity extends Document {
  @Prop({ required: true })
  projectName!: string;

  @Prop()
  projectLeader?: string;

  @Prop({ required: true })
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
