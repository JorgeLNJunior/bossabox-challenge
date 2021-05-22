import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@mail.com',
    required: true,
  })
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'DgA4ebg9SdCd6YyG',
    required: true,
  })
  @IsOptional()
  password: string;
}
