import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.projectsService.findAll(userId, Number(page), Number(limit));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':projectId/issues/:issueId')
  async addIssueToProject(
    @Param('projectId') projectId: string,
    @Param('issueId') issueId: string,
  ) {
    return this.projectsService.addIssueToProject(projectId, issueId);
  }

  @Get(':projectId/issues')
  async getIssuesInProject(@Param('projectId') projectId: string) {
    return this.projectsService.getIssuesInProject(projectId);
  }
}
