import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '../../projects/schemas/project.schema';

@Schema({ timestamps: true })
export class Issue extends Document {
  @Prop({ required: true, unique: true })
  declare id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Story', 'Task', 'Bug'], required: true })
  type: string;

  @Prop({ enum: ['Backlog', 'Selected', 'InProgress', 'Done'], required: true })
  status: string;

  @Prop({ enum: ['Lowest', 'Low', 'Medium', 'High', 'Highest'], required: true })
  priority: string;

  @Prop({ default: 1 })
  listPosition: number;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  reporterId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  userIds: Types.ObjectId[];
}

export const IssueSchema = SchemaFactory.createForClass(Issue);