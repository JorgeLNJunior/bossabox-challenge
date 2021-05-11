import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ToolDocument = Tool & Document;

@Schema()
export class Tool {
  @Prop()
  title: string;

  @Prop()
  link: string;

  @Prop([String])
  tags: string[];
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
