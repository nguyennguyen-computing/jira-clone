import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '../../projects/schemas/project.schema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  declare id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatarUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  projectId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);