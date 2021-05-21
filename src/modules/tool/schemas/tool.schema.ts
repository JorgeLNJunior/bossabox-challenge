import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';

export type ToolDocument = Tool & Document;

@Schema({ versionKey: false })
export class Tool {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  link: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
