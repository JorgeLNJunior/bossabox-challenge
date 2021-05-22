import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty({
    default: 400,
  })
  statusCode: number;

  @ApiProperty({
    example: ['name should not be empty'],
  })
  message: string[];
}
