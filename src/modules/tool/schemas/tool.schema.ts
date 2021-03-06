import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  user_id: string;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
