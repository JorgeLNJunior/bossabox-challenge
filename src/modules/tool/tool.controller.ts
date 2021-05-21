import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { CreateToolDto } from './dto/create-tool.dto';
import { ToolQuery } from './query/toolQuery';
import { ToolService } from './tool.service';

@ApiTags('Tool')
@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ description: 'the tool has been created' })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiTooManyRequestsResponse({ description: 'too many requests' })
  @Post()
  async create(@Body() createToolDto: CreateToolDto, @Request() req) {
    const tool = await this.toolService.create(createToolDto, req.user._id);

    return {
      status: 201,
      tool: tool,
    };
  }

  @ApiOkResponse({ description: 'return a list of tools' })
  @ApiTooManyRequestsResponse({ description: 'too many requests' })
  @ApiQuery({
    type: ToolQuery,
  })
  @Get()
  async findAll(@Query() query: ToolQuery) {
    const tools = await this.toolService.findAll(query);

    return {
      status: 200,
      tools: tools,
    };
  }

  @ApiOkResponse({ description: 'the tool has been deleted' })
  @ApiBadRequestResponse({ description: 'the tool was not found' })
  @ApiTooManyRequestsResponse({ description: 'too many requests' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.toolService.remove(id);

    return {
      status: 200,
      message: 'the tool has been deleted',
    };
  }
}
