import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true, unique: true })
  declare id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Issue' }] })
  issues: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
