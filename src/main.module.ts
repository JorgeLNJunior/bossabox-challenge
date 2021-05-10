import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToolModule } from './tool/tool.module';

@Module({
  imports: [ToolModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class MainModule {}
