import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

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
  @IsNumberString()
  limit?: string;
}
