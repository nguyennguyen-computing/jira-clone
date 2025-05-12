import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    default:
      'https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1592405732/ironman_c3jrbc.jpg',
  })
  avatarUrl: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
