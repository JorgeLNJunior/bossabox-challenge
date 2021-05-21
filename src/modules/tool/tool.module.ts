import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { Tool, ToolSchema } from './schemas/tool.schema';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tool.name, schema: ToolSchema }]),
    UserModule,
  ],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
