import { ApiProperty } from '@nestjs/swagger';

export class DeleteToolResponse {
  @ApiProperty({
    default: 200,
  })
  statusCode: number;

  @ApiProperty({
    default: 'the tool has been deleted',
  })
  message: string;

  constructor(message?: string, statusCode?: number) {
    this.message = message || 'the tool has been deleted';
    this.statusCode = statusCode || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
