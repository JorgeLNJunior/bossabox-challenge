import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CreateToolDto } from './dto/create-tool.dto';
import { ToolQuery } from './query/toolQuery.interface';
import { ToolService } from './tool.service';

@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post()
  async create(@Body() createToolDto: CreateToolDto) {
    const tool = await this.toolService.create(createToolDto);

    return {
      status: 201,
      tool: tool,
    };
  }

  @Get()
  async findAll(@Query() query: ToolQuery) {
    const tools = await this.toolService.findAll(query);

    return {
      status: 200,
      tools: tools,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.toolService.remove(id);

    return {
      status: 200,
      message: 'tool deleted',
    };
  }
}
