import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

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
  findAll() {
    return this.toolService.findAll();
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
