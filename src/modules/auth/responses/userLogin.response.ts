import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponse {
  @ApiProperty({
    default: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'eyJhbGciOiJIUNn0.y_XMwEX_wX-5O68z0YQKKjk2ncaPYLi4oa5oszf33ow',
  })
  access_token: string;

  constructor(token: string, statusCode?: number) {
    this.access_token = token;
    this.statusCode = statusCode || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      access_token: this.access_token,
    };
  }
}
