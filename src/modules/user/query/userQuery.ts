import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UserQuery {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
