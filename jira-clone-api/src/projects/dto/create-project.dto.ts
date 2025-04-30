import { IsString, IsOptional, IsArray, IsDate } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  owner: string;

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

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  budget?: string;

  @IsOptional()
  endDate?: string;
}
