import { ApiProperty } from '@nestjs/swagger';

export class ToolQuery {
  @ApiProperty({ required: false })
  _id?: string;

  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  tag?: string;

  @ApiProperty({ required: false })
  limit?: string;
}
