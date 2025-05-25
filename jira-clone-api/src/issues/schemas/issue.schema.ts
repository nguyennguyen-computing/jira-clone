import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '../../projects/schemas/project.schema';

@Schema({ timestamps: true })
export class Issue extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Story', 'Task', 'Bug'], required: true })
  type: string;

  @Prop({ enum: ['Backlog', 'Selected', 'InProgress', 'Done'], required: true })
  status: string;

  @Prop({
    enum: ['Lower', 'Low', 'Medium', 'High', 'Highest'],
    required: true,
  })
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

IssueSchema.pre<Issue>('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  const model = this.constructor as any;
  const lastIssue = await model
    .findOne({ projectId: this.projectId })
    .sort({ listPosition: -1 })
    .exec();

  this.listPosition = lastIssue ? lastIssue.listPosition + 1 : 1;
  next();
});
