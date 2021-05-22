import { ApiProperty } from '@nestjs/swagger';

import { ToolDocument } from '../schemas/tool.schema';
import { toolExample } from './helpers/apiExamples';

export class CreateToolResponse {
  @ApiProperty({
    default: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: toolExample,
  })
  tool: ToolDocument;

  constructor(tool: ToolDocument, statusCode?: number) {
    this.tool = tool;
    this.statusCode = statusCode || 201;
  }

  build() {
    return {
      statusCode: this.statusCode,
      tool: this.tool,
    };
  }
}
