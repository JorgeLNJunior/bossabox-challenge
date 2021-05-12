import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
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
  async findAll() {
    const tools = await this.toolService.findAll();

    return {
      status: 200,
      tools: tools,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolService.update(+id, updateToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolService.remove(+id);
  }
}
