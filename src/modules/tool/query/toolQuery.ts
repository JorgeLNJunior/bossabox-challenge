import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ToolQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  _id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  tag?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  limit?: string;
}
