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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { BadRequestResponse } from 'src/shared/responses/badRequest.response';
import { ForbiddenResponse } from 'src/shared/responses/forbidden.response';
import { TooManyRequestsResponse } from 'src/shared/responses/tooManyRequests.response';

import { CreateToolDto } from './dto/create-tool.dto';
import { ToolQuery } from './query/toolQuery';
import { CreateToolResponse } from './responses/createTool.response';
import { DeleteToolResponse } from './responses/deleteTool.response';
import { GetToolsResponse } from './responses/getTools.response';
import { ToolService } from './tool.service';

@ApiBearerAuth()
@ApiTags('Tool')
@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @ApiCreatedResponse({
    description: 'the tool has been created',
    type: CreateToolResponse,
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    type: BadRequestResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'too many requests',
    type: TooManyRequestsResponse,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createToolDto: CreateToolDto, @Request() req) {
    const tool = await this.toolService.create(createToolDto, req.user._id);

    return new CreateToolResponse(tool).build();
  }

  @ApiOkResponse({
    description: 'return a list of tools',
    type: GetToolsResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'too many requests',
    type: TooManyRequestsResponse,
  })
  @ApiQuery({
    type: ToolQuery,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() query: ToolQuery, @Request() req) {
    const tools = await this.toolService.findAll(query, req.user._id);

    return new GetToolsResponse(tools).build();
  }

  @ApiOkResponse({
    description: 'the tool has been deleted',
    type: DeleteToolResponse,
  })
  @ApiBadRequestResponse({
    description: 'the tool was not found',
    type: BadRequestResponse,
  })
  @ApiForbiddenResponse({
    description: 'forbidden action',
    type: ForbiddenResponse,
  })
  @ApiTooManyRequestsResponse({
    description: 'too many requests',
    type: TooManyRequestsResponse,
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.toolService.remove(id, req.user._id);

    return new DeleteToolResponse().build();
  }
}
