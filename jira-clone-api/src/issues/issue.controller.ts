import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IssuesService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';

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

  @Get('project/:projectId')
  async findByProjectId(@Param('projectId') projectId: string) {
    return this.issuesService.findByProjectId(projectId);
  }
}
