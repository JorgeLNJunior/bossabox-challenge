import { Module } from '@nestjs/common';
import { ToolModule } from './tool/tool.module';

@Module({
  imports: [ToolModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
