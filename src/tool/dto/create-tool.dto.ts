import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateToolDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: string[];
}
