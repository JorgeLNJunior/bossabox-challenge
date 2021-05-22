import { ApiProperty } from '@nestjs/swagger';

import { ToolDocument } from '../schemas/tool.schema';
import { toolExample } from './helpers/apiExamples';

export class GetToolsResponse {
  @ApiProperty({
    default: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: [toolExample],
  })
  tools: ToolDocument[];

  constructor(tools: ToolDocument[], statusCode?: number) {
    this.tools = tools;
    this.statusCode = statusCode || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      tools: this.tools,
    };
  }
}
