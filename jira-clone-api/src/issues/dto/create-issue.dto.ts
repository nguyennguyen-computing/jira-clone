import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['Story', 'Task', 'Bug'])
  type: string;

  @IsEnum(['Backlog', 'Selected', 'InProgress', 'Done'])
  status: string;

  @IsEnum(['Critical', 'High', 'Medium', 'Lower'])
  priority: string;

  @IsString()
  projectId: string;

  @IsString()
  reporterId: string;

  @IsArray()
  @IsOptional()
  userIds?: string[];
}
