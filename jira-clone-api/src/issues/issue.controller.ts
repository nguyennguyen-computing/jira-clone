import { Controller, Post, Body, Get, Param, Put, Patch } from '@nestjs/common';
import { IssuesService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './schemas/issue.schema';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  async create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @Get()
  async findAll() {
    return this.issuesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.issuesService.findOne(id);
  }

  @Patch(':id')
  async updateIssue(
    @Param('id') issueId: string,
    @Body() updateData: { status?: string; listPosition?: number; [key: string]: any }
  ): Promise<Issue | null> {
    return this.issuesService.updateIssue(issueId, updateData);
  }

  @Get('project/:projectId')
  async findByProjectId(@Param('projectId') projectId: string) {
    return this.issuesService.findByProjectId(projectId);
  }

  @Put('update')
  async updateIssues(
    @Body()
    updatedIssues: { _id: string; status?: string; listPosition?: number }[],
  ) {
    return this.issuesService.updateIssues(updatedIssues);
  }
}
