import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateToolDto {
  @ApiProperty({ example: 'notion', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://notion.so', required: true })
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @ApiProperty({
    required: true,
    minItems: 1,
    type: [String],
    example: [
      'organization',
      'planning',
      'collaboration',
      'writing',
      'calendar',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: string[];
}
