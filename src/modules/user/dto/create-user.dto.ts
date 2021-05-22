import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsEmailAlreadyInUse } from '../decorators/isEmailAlreadyInUse';

export class CreateUserDto {
  @ApiProperty({
    example: 'user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user@mail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsEmailAlreadyInUse()
  email: string;

  @ApiProperty({
    example: 'DgA4ebg9SdCd6YyG',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
