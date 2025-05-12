import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Reference to the User model
  owner: Types.ObjectId;

  @Prop()
  url?: string;

  @Prop()
  description?: string;

  @Prop()
  category?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Issue' }] }) // Array of issue IDs
  issues?: Types.ObjectId[];

  @Prop()
  status?: string;

  @Prop()
  priority?: string;

  @Prop()
  budget?: string;

  @Prop()
  endDate?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
