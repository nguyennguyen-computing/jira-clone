import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateIssueDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['Story', 'Task', 'Bug'])
  type: string;

  @IsEnum(['Backlog', 'Selected', 'InProgress', 'Done'])
  status: string;

  @IsEnum(['Lowest', 'Low', 'Medium', 'High', 'Highest'])
  priority: string;

  @IsNumber()
  @IsOptional()
  listPosition?: number;

  @IsString()
  projectId: string;

  @IsString()
  reporterId: string;

  @IsArray()
  @IsOptional()
  userIds?: string[];
}
