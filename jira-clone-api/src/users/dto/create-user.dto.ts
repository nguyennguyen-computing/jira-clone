import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  projectId?: string;
}
