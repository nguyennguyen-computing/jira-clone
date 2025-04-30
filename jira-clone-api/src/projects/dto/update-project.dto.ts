import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  members?: string[];

  @IsOptional()
  @IsString()
  category?: string;
}
