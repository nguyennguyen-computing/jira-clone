import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsOptional()
  users?: string[];

  @IsArray()
  @IsOptional()
  issues?: string[];
}
