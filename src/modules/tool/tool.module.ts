import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tool, ToolSchema } from './schemas/tool.schema';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tool.name, schema: ToolSchema }]),
  ],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
