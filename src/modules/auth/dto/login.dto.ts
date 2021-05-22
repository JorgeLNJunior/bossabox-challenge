import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@mail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'DgA4ebg9SdCd6YyG',
    required: true,
  })
  password: string;
}
